import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Product from '../infra/typeorm/entities/Product';

import IProductsRepository from '../repositories/IProductsRepository';
import IProductSupplierRepository from '../repositories/IProductSupplierRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

@injectable()
export default class createProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    asin,
    sku,
    upc,
    note,
    suppliers,
  }: ICreateProductDTO): Promise<Product> {
    const product = await this.productsRepository.create({
      name,
      asin,
      note,
      sku,
      upc,
    });

    suppliers.forEach(async supplier => {
      const { id, sku_supplier, note: note_supplier } = supplier;
      await this.productSupplierRepository.create({
        supplier_id: id,
        product_id: product.id,
        sku_supplier,
        note: note_supplier,
      });
    });

    await this.cacheProvider.invalidate('products-list');

    return product;
  }
}
