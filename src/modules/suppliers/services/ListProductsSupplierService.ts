/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';
import ProductSupplier from '@modules/products/infra/typeorm/entities/ProductSupplier';

interface IRequest {
  supplier_id: string;
}

@injectable()
export default class ListProductsSupplierService {
  constructor(
    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ supplier_id }: IRequest): Promise<ProductSupplier[]> {
    if (!supplier_id) {
      throw new AppError('Missing product_id');
    }

    const suppliers = await this.productSupplierRepository.getProducts(
      supplier_id,
    );

    // await this.cacheProvider.invalidate('products-list');

    return suppliers;
  }
}
