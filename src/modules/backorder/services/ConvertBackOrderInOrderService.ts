import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import AppError from '@shared/errors/AppError';
import IProductsOrderRepository from '@modules/orders/repositories/IProductsOrderRepository';
import Order from '@modules/orders/infra/typeorm/entities/Order';
import IBackOrderRepository from '../repositories/IBackOrderRepository';

@injectable()
export default class ConvertBackOrderInOrderService {
  constructor(
    @inject('IBackOrderRepository')
    private backOrderRepository: IBackOrderRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(back_orders_ids: string[]): Promise<Order> {
    const backorders = await this.backOrderRepository.findByIds(
      back_orders_ids,
    );

    if (backorders.length === 0) {
      throw new AppError('BackOrders invalid.');
    }

    const firstBackOrder = backorders[0];

    const backOrderSameSupplier = backorders.filter(
      backOrder =>
        backOrder.product_supplier.supplier_id ===
        firstBackOrder.product_supplier.supplier_id,
    );

    if (backOrderSameSupplier.length !== back_orders_ids.length) {
      throw new AppError('BackOrders not same supplier.');
    }

    const order = await this.ordersRepository.create({
      supplier_id: firstBackOrder.product_supplier.supplier_id,
      date: new Date(),
      total_charged: 0,
    });

    const productsOrder = await Promise.all(
      backorders.map(async backOrder => {
        const newProductOrder = await this.productsOrderRepository.create({
          order_id: order.id,
          product_supplier_id: backOrder.product_supplier_id,
        });
        return newProductOrder;
      }),
    );

    await Promise.all(
      backorders.map(async backOrder => {
        await this.backOrderRepository.delete(backOrder.id);
        return backOrder;
      }),
    );

    order.products_order = productsOrder;

    return order;
  }
}
