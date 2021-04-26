/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';

interface IRequest {
  shipment_order_id: string;
  shipment_id: string;
  note: string;
}

@injectable()
export default class UpdateShipmentOrdersService {
  constructor(
    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({
    shipment_order_id,
    shipment_id,
    note,
  }: IRequest): Promise<ShipmentOrder> {
    const shipment_order = await this.shipmentOrdersRepository.findByID(
      shipment_order_id,
    );

    if (!shipment_order) {
      throw new AppError('Shipment not found');
    }

    const shipment = await this.amazonSellerProvider.getShipment(shipment_id);
    const { TransportContent } = shipment;
    const { IsPartnered, ShipmentType } = TransportContent.TransportHeader;

    let cost = 0;
    if (IsPartnered) {
      if (ShipmentType === 'SP') {
        cost =
          TransportContent.TransportDetails.PartneredSmallParcelData
            .PartneredEstimate.Amount.Value;
      }
    }

    shipment_order.shipment_id = shipment_id;
    shipment_order.note = note;

    await this.shipmentOrdersRepository.save(shipment_order);

    return shipment_order;
  }
}
