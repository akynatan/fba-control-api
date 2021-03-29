import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductSupplierRepository from '../repositories/IProductSupplierRepository';
import ProductSupplier from '../infra/typeorm/entities/ProductSupplier';

interface IRequest {
  id: string;
  new_supplier_id: string;
}

@injectable()
export default class AlterSupplierForProductSupplierService {
  constructor(
    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    new_supplier_id,
  }: IRequest): Promise<ProductSupplier> {
    const product_supplier = await this.productSupplierRepository.findByID(id);

    if (!product_supplier) {
      throw new AppError('Product Supplier not found.');
    }

    product_supplier.supplier_id = new_supplier_id;

    const x = await this.productSupplierRepository.save(product_supplier);
    console.log(x);

    // await this.cacheProvider.invalidate('products-list');

    const product_supplier_updated = await this.productSupplierRepository.findByID(
      id,
    );

    // console.log(product_supplier_updated);

    return product_supplier_updated || product_supplier;
  }
}
