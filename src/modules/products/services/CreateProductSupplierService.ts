import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import IProductSupplierRepository from '../repositories/IProductSupplierRepository';
import ICreateProductSupplierDTO from '../dtos/ICreateProductSupplierDTO';
import ProductSupplier from '../infra/typeorm/entities/ProductSupplier';

@injectable()
export default class createProductService {
  constructor(
    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    supplier_id,
    note,
    sku_supplier,
  }: ICreateProductSupplierDTO): Promise<ProductSupplier> {
    const product_supplier = await this.productSupplierRepository.create({
      product_id,
      supplier_id,
      note,
      sku_supplier,
    });

    // await this.cacheProvider.invalidate('products-list');

    return product_supplier;
  }
}
