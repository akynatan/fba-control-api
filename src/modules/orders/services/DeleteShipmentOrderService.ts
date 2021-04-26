/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteShipmentOrderService {
  constructor(
    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const shipment = await this.shipmentOrdersRepository.findByID(id);

    if (!shipment) {
      throw new AppError('Shipment not found');
    }

    await this.shipmentOrdersRepository.delete(id);
  }
}
