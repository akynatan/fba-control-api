/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IProductsOrderRepository from '@modules/orders/repositories/IProductsOrderRepository';
import IShipmentOrdersRepository from '@modules/shipments/repositories/IShipmentOrdersRepository';
import ShipmentOrder from '@modules/shipments/infra/typeorm/entities/ShipmentOrder';

interface IRequest {
  product_id: string;
}

@injectable()
export default class ListShipmentFromProductService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('ShipmentOrdersRepository')
    private shipmentOrdersRepository: IShipmentOrdersRepository,
  ) {}

  public async execute({ product_id }: IRequest): Promise<ShipmentOrder[]> {
    const orders = await this.productsOrderRepository.findByProduct(product_id);

    const orders_for = orders.map(order => order.order_id);

    let shipments: ShipmentOrder[] = [];

    if (orders.length > 0) {
      shipments = await this.shipmentOrdersRepository.findByOrders(orders_for);
    }

    return shipments;
  }
}
