import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductsRepository from '../repositories/IProductsRepository';
import Product from '../infra/typeorm/entities/Product';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findByID(id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    await this.productsRepository.delete(id);

    // await this.cacheProvider.invalidate('products-list');

    return product;
  }
}
