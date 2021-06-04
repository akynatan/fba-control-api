/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';
import IItemShipmentOrdersRepository from '../repositories/IItemShipmentOrdersRepository';

interface IRequest {
  shipments_order_id: string[];
}
@injectable()
export default class SyncManyShipmentOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,

    @inject('ItemShipmentOrdersRepository')
    private itemShipmentOrdersRepository: IItemShipmentOrdersRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({
    shipments_order_id,
  }: IRequest): Promise<ShipmentOrder[]> {
    const shipments_updated = shipments_order_id.map(async shipment_id => {
      const shipment_order = await this.shipmentOrdersRepository.findByID(
        shipment_id,
      );

      if (!shipment_order) {
        return ({} as unknown) as ShipmentOrder;
      }

      const shipment_amazon = await this.amazonSellerProvider.getShipment(
        shipment_order.shipment_id,
      );

      let cost = 0;
      const { TransportContent } = shipment_amazon;
      if (TransportContent) {
        const { IsPartnered, ShipmentType } = TransportContent.TransportHeader;

        if (IsPartnered) {
          if (ShipmentType === 'SP') {
            if (
              TransportContent.TransportDetails.PartneredSmallParcelData
                .PartneredEstimate
            ) {
              cost =
                TransportContent.TransportDetails.PartneredSmallParcelData
                  .PartneredEstimate.Amount.Value;
            }
          }
          if (ShipmentType === 'LTL') {
            if (
              TransportContent.TransportDetails.PartneredLtlData
                .PartneredEstimate
            ) {
              cost =
                TransportContent.TransportDetails.PartneredLtlData
                  .PartneredEstimate.Amount.Value;
            }
          }
        }
      }

      shipment_order.cost = cost;

      let status = '';
      const status_shipment = await this.amazonSellerProvider.getStatusByShipment(
        shipment_order.shipment_id,
      );

      const { ShipmentData } = status_shipment;

      if (ShipmentData.length > 0) {
        status = ShipmentData[0].ShipmentStatus;
      }

      shipment_order.status = status;

      const items_shipment = await this.amazonSellerProvider.getItemsByShipment(
        shipment_order.shipment_id,
      );

      await this.itemShipmentOrdersRepository.deleteByShipmentID(shipment_id);

      shipment_order.items_shipment = [];
      if (items_shipment.ItemData) {
        const all_items_shipments = items_shipment.ItemData.map(async item => {
          const item_shipment_created = await this.itemShipmentOrdersRepository.create(
            {
              qtd_received: item.QuantityReceived,
              qtd_shipped: item.QuantityShipped,
              sku: item.SellerSKU,
              shipment_order_id: shipment_order.id,
            },
          );
          return item_shipment_created;
        });

        const all_items_shipments_response = await Promise.all(
          all_items_shipments,
        );

        shipment_order.items_shipment = all_items_shipments_response;
      }

      await this.shipmentOrdersRepository.save(shipment_order);

      return shipment_order;
    });

    return Promise.all(shipments_updated);
  }
}
