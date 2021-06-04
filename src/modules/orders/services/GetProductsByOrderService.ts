import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IOrdersRepository from '../repositories/IOrdersRepository';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';

interface IRequest {
  order_id: string;
}

@injectable()
export default class GetProductsByOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ order_id }: IRequest): Promise<ProductsOrder[]> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    const products = await this.productsOrderRepository.getProducts(order_id);

    // await this.cacheProvider.invalidate('products-list');

    return products;
  }
}
