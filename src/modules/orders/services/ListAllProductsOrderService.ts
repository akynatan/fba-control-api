import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';

@injectable()
export default class ListAllProductsOrderService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ProductsOrder[]> {
    const cacheKey = `products-list`;

    // let products = await this.cacheProvider.recover<Product[]>(cacheKey);
    let products_order;

    if (!products_order) {
      products_order = await this.productsOrderRepository.findAll();

      await this.cacheProvider.save(cacheKey, products_order);
    }

    return products_order;
  }
}
