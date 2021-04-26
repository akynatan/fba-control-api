/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';
import IItemShipmentOrdersRepository from '../repositories/IItemShipmentOrdersRepository';

interface IRequest {
  order_id: string;
  note?: string;
  shipment_id: string;
}
@injectable()
export default class CreateShipmentOrdersService {
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
    order_id,
    shipment_id,
    note,
  }: IRequest): Promise<ShipmentOrder> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    let cost = 0;
    const shipment = await this.amazonSellerProvider.getShipment(shipment_id);
    const { TransportContent } = shipment;
    if (TransportContent) {
      const { IsPartnered, ShipmentType } = TransportContent.TransportHeader;

      if (IsPartnered) {
        if (ShipmentType === 'SP') {
          cost =
            TransportContent.TransportDetails.PartneredSmallParcelData
              .PartneredEstimate.Amount.Value;
        }
        if (ShipmentType === 'LTL') {
          cost =
            TransportContent.TransportDetails.PartneredLtlData.PartneredEstimate
              .Amount.Value;
        }
      }
    }

    let status;
    const status_shipment = await this.amazonSellerProvider.getStatusByShipment(
      shipment_id,
    );

    const { ShipmentData } = status_shipment;

    if (ShipmentData.length > 0) {
      status = ShipmentData[0].ShipmentStatus;
    }

    const shipment_order = await this.shipmentOrdersRepository.create({
      order_id,
      shipment_id,
      note,
      cost,
      status,
    });

    const items_shipment = await this.amazonSellerProvider.getItemsByShipment(
      shipment_id,
    );

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

    return shipment_order;
  }
}
