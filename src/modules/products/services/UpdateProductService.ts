import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: string;
  name: string;
  sku: string;
  asin: string;
  upc: string;
  note: string;
}

@injectable()
export default class updateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    name,
    asin,
    sku,
    upc,
    note,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findByID(product_id);

    if (!product) {
      throw new AppError('User not found.');
    }

    product.name = name;
    product.asin = asin;
    product.sku = sku;
    product.upc = upc;
    product.note = note;

    this.productsRepository.save(product);

    await this.cacheProvider.invalidate('products-list');

    return product;
  }
}
