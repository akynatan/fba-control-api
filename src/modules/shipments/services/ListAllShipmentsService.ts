/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IOrdersRepository from '../../orders/repositories/IOrdersRepository';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';

@injectable()
export default class ListAllShipmentsService {
  constructor(
    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,
  ) {}

  public async execute(): Promise<ShipmentOrder[]> {
    const shipments = await this.shipmentOrdersRepository.findAll();

    return shipments;
  }
}
