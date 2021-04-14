import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  product_id: string;
  sku: string;
}

@injectable()
export default class SyncDataProductByAmazonService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({ product_id, sku }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findByID(product_id);

    if (!product) {
      throw new AppError('Product not found.');
    }

    const productAmazon = await this.amazonSellerProvider.getDataProduct(sku);

    if (productAmazon.Items.length > 0) {
      product.asin = productAmazon.Items[0].Identifiers.MarketplaceASIN.ASIN;
      product.name = productAmazon.Items[0].AttributeSets[0].Title;
      product.image = productAmazon.Items[0].AttributeSets[0].SmallImage.URL;
      product.brand = productAmazon.Items[0].AttributeSets[0].Brand;
    }

    await this.productsRepository.save(product);

    // await this.cacheProvider.invalidate('products-list');

    return product;
  }
}
