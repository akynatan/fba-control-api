/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IItemsByShipment from '@shared/container/providers/AmazonProvider/dtos/IItemsByShipment';
import IParamsGetAllShipments from '@shared/container/providers/AmazonProvider/dtos/IParamsGetAllShipments';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';
import IItemShipmentOrdersRepository from '../repositories/IItemShipmentOrdersRepository';
import ItemShipmentOrder from '../infra/typeorm/entities/ItemShipmentOrder';

interface IUpdateShipmentOrder {
  shipments: ShipmentOrder[];
  cost: number;
  status: string;
  items_shipment: IItemsByShipment;
}

interface ICreateItemsShipment {
  items_shipment: IItemsByShipment;
  shipment_order_id: string;
}

@injectable()
export default class SyncAllShipmentsService {
  constructor(
    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,

    @inject('ItemShipmentOrdersRepository')
    private itemShipmentOrdersRepository: IItemShipmentOrdersRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({
    date_init,
    date_finally,
  }: IParamsGetAllShipments): Promise<any> {
    console.log('init');
    const all_shipments = await this.amazonSellerProvider.getAllShipments({
      date_init,
      date_finally,
    });

    const shipments_updated = all_shipments.ShipmentData.map(async shipment => {
      const shipment_amazon = await this.amazonSellerProvider.getShipment(
        shipment.ShipmentId,
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

      let status = '';
      const status_shipment = await this.amazonSellerProvider.getStatusByShipment(
        shipment.ShipmentId,
      );

      const { ShipmentData } = status_shipment;

      if (ShipmentData.length > 0) {
        status = ShipmentData[0].ShipmentStatus;
      }

      const items_shipment = await this.amazonSellerProvider.getItemsByShipment(
        shipment.ShipmentId,
      );

      const shipments_inserted = await this.shipmentOrdersRepository.findByShipmentId(
        shipment.ShipmentId,
      );

      if (shipments_inserted.length > 0) {
        const shipments_updated_response = await Promise.resolve(
          this.updateShipmentsExistents({
            shipments: shipments_inserted,
            cost,
            status,
            items_shipment,
          }),
        );

        return shipments_updated_response;
      }

      const shipment_created = await this.shipmentOrdersRepository.create({
        shipment_id: shipment.ShipmentId,
        cost,
        status,
      });

      const items_shipment_created = await this.createItemsShipment({
        items_shipment,
        shipment_order_id: shipment_created.id,
      });

      shipment_created.items_shipment = items_shipment_created;

      return [shipment_created];
    });

    const shipments_response: ShipmentOrder[] = [];

    const shipments_map = await Promise.all(shipments_updated);

    shipments_map.forEach(shipment => shipments_response.push(...shipment));
    console.log('finally');

    return shipments_response;
  }

  private async updateShipmentsExistents({
    shipments,
    cost,
    status,
    items_shipment,
  }: IUpdateShipmentOrder): Promise<ShipmentOrder[]> {
    const shipments_updated = shipments.map(async shipment => {
      shipment.status = status;
      shipment.cost = cost;

      if (items_shipment.ItemData) {
        await this.itemShipmentOrdersRepository.deleteByShipmentID(shipment.id);

        shipment.items_shipment = [];
        const new_items_shipment_inserted = await this.createItemsShipment({
          items_shipment,
          shipment_order_id: shipment.id,
        });
        shipment.items_shipment = new_items_shipment_inserted;
      }

      return this.shipmentOrdersRepository.save(shipment);
    });

    return Promise.all(shipments_updated);
  }

  private async createItemsShipment({
    items_shipment,
    shipment_order_id,
  }: ICreateItemsShipment): Promise<ItemShipmentOrder[]> {
    const all_items_shipments = items_shipment.ItemData.map(async item => {
      const item_shipment_created = await this.itemShipmentOrdersRepository.create(
        {
          qtd_received: item.QuantityReceived,
          qtd_shipped: item.QuantityShipped,
          sku: item.SellerSKU,
          shipment_order_id,
        },
      );

      return item_shipment_created;
    });

    return Promise.all(all_items_shipments);
  }
}
