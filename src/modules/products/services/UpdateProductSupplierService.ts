import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';
import IProductSupplierRepository from '../repositories/IProductSupplierRepository';
import ICreateProductSupplierDTO from '../dtos/ICreateProductSupplierDTO';
import ProductSupplier from '../infra/typeorm/entities/ProductSupplier';

interface IRequest {
  product_supplier_id: string;
  supplier_id: string;
  note: string;
  sku_supplier: string;
}

@injectable()
export default class UpdateProductSupplierService {
  constructor(
    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_supplier_id,
    supplier_id,
    note,
    sku_supplier,
  }: IRequest): Promise<ProductSupplier> {
    const product_supplier = await this.productSupplierRepository.findByID(
      product_supplier_id,
    );

    if (!product_supplier) {
      throw new AppError('Product Supplier does not exist');
    }

    product_supplier.supplier_id = supplier_id;
    product_supplier.note = note;
    product_supplier.sku_supplier = sku_supplier;

    await this.productSupplierRepository.save(product_supplier);

    // await this.cacheProvider.invalidate('products-list');

    return product_supplier;
  }
}
