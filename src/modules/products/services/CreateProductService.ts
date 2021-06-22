import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
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

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({
    asin,
    name,
    image,
    brand,
    sku,
    upc,
    note,
    suppliers,
  }: ICreateProductDTO): Promise<Product> {
    const products = await this.productsRepository.findBySKU(sku);

    if (products.length > 0) {
      throw new AppError(
        'there is already a product registered with this sku',
        303,
      );
    }

    const productAmazon = await this.amazonSellerProvider.getDataProduct(sku);

    let newAsin;
    let newName;
    let newImage;
    let newBrand;

    if (productAmazon.Items.length > 0) {
      newAsin = productAmazon.Items[0].Identifiers.MarketplaceASIN.ASIN;
      newName = productAmazon.Items[0].AttributeSets[0].Title;
      newImage = productAmazon.Items[0].AttributeSets[0].SmallImage.URL;
      newBrand = productAmazon.Items[0].AttributeSets[0].Brand;
    }

    newAsin = newAsin || asin;

    let preps_string;
    let label;
    if (newAsin) {
      const preps = await this.amazonSellerProvider.getPrepInstructions([
        newAsin,
      ]);

      preps_string = preps.ASINPrepInstructionsList[0].PrepInstructionList.join(
        ', ',
      );
      label = preps.ASINPrepInstructionsList[0].BarcodeInstruction;
    }

    const product = await this.productsRepository.create({
      asin: newAsin || asin,
      name: newName || name,
      image: newImage || image,
      brand: newBrand || brand,
      sku,
      note,
      upc,
      prep: preps_string,
      label,
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
