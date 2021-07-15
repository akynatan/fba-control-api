/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '../../orders/repositories/IOrdersRepository';
import IShipmentOrdersRepository from '../repositories/IShipmentOrdersRepository';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';

interface IRequest {
  order_id: string;
}

@injectable()
export default class ListShipmentFromOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,
  ) {}

  public async execute({ order_id }: IRequest): Promise<ShipmentOrder[]> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const shipments = await this.shipmentOrdersRepository.findByOrder(order_id);

    return shipments;
  }
}
