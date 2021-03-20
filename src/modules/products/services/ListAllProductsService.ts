import { injectable, inject } from 'tsyringe';
import { classToClass } from 'class-transformer';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class listAllProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Product[]> {
    const cacheKey = `products-list`;

    let products = await this.cacheProvider.recover<Product[]>(cacheKey);

    if (!products) {
      products = await this.productsRepository.findAll();

      await this.cacheProvider.save(cacheKey, products);
    }

    return products;
  }
}
