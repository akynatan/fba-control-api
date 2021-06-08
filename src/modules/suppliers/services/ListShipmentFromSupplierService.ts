/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IShipmentOrdersRepository from '@modules/orders/repositories/IShipmentOrdersRepository';
import ShipmentOrder from '@modules/orders/infra/typeorm/entities/ShipmentOrder';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';

interface IRequest {
  supplier_id: string;
}

@injectable()
export default class ListShipmentFromSupplierService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,
  ) {}

  public async execute({ supplier_id }: IRequest): Promise<ShipmentOrder[]> {
    const orders = await this.ordersRepository.findBySupplier(supplier_id);

    const orders_for = orders.map(order => order.id);

    const shipments = await this.shipmentOrdersRepository.findByOrders(
      orders_for,
    );

    return shipments;
  }
}
