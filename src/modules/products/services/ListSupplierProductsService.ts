import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import AppError from '@shared/errors/AppError';
import ProductSupplier from '../infra/typeorm/entities/ProductSupplier';

import IProductSupplierRepository from '../repositories/IProductSupplierRepository';

interface IRequest {
  product_id: string | undefined;
}

@injectable()
export default class ListSupplierProductsService {
  constructor(
    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ product_id }: IRequest): Promise<ProductSupplier[]> {
    if (!product_id) {
      throw new AppError('Missing product_id');
    }

    const products = await this.productSupplierRepository.getSuppliers(
      product_id,
    );

    // await this.cacheProvider.invalidate('products-list');

    return products;
  }
}
