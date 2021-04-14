import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductSupplierRepository from '../repositories/IProductSupplierRepository';
import ProductSupplier from '../infra/typeorm/entities/ProductSupplier';

interface IRequest {
  id: string;
}

@injectable()
export default class ToggleRestrictionToBuyService {
  constructor(
    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<ProductSupplier> {
    const product_supplier = await this.productSupplierRepository.findByID(id);

    if (!product_supplier) {
      throw new AppError('Product Supplier not found.');
    }

    // await this.cacheProvider.invalidate('products-list');

    product_supplier.restriction_to_buy = !product_supplier.restriction_to_buy;

    await this.productSupplierRepository.save(product_supplier);

    return product_supplier;
  }
}
