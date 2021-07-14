/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';
import IItemShipmentOrdersRepository from '../repositories/IItemShipmentOrdersRepository';
import IItemsByShipment from '@shared/container/providers/AmazonProvider/dtos/IItemsByShipment';

interface IRequestUpdate {
  shipments: ShipmentOrder[],
  cost: number,
  status: string,
  items_shipment: IItemsByShipment
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

  public async execute(): Promise<ShipmentOrder[]> {
    const all_shipments = await this.amazonSellerProvider.getAllShipments();

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
        shipment.ShipmentId
      )

      if(shipments_inserted.length > 0) {
        await this.updateShipmentsExistents({shipments: shipments_inserted, cost, status, items_shipment})
      }

    });

    return Promise.all(shipments_updated);
  }

  private async updateShipmentsExistents({
    shipments,
    cost,
    status,
    items_shipment,
  }: IRequestUpdate) {
    shipments.map(async shipment => {
      shipment.status = status;
      shipment.cost = cost;

      shipment.items_shipment = [];
      if (items_shipment.ItemData) {
        await this.createItemsShipment(items_shipment.ItemData, shipment_order.id);
      }


      await this.shipmentOrdersRepository.save(shipment);
    });

    await this.itemShipmentOrdersRepository.deleteByShipmentID(shipment_id);
    if (items_shipment.ItemData) {
      shipment.items_shipment = [];
      const new_items_shipment_inserted = await this.createItemsShipment(items_shipment.ItemData, shipment_order.id);
      shipment.items_shipment = new_items_shipment_inserted;
    }
  }

  private async createItemsShipment(items_shipment, shipment_order_id) {
    await this.itemShipmentOrdersRepository.deleteByShipmentID(shipment_order_id);

    const all_items_shipments = items_shipment.map(async item => {
      const item_shipment_created = await this.itemShipmentOrdersRepository.create(
        {
          qtd_received: item.QuantityReceived,
          qtd_shipped: item.QuantityShipped,
          sku: item.SellerSKU,
          shipment_order_id: shipment_order_id,
        },
      );
      return item_shipment_created;
    });

    const all_items_shipments_response = await Promise.all(
      all_items_shipments,
    );


    }
  }
}
