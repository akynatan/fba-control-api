/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import ExcelToJson from 'convert-excel-to-json';

import uploadConfig from '@config/upload';

import { subDays, format } from 'date-fns';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

@injectable()
export default class GetReportProductsUpdatedInAmazon {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute(): Promise<any> {
    const yesterday = subDays(new Date(), 1);

    const productAmazon = await this.amazonSellerProvider.getInventorySummaries(
      {
        start_date: `${format(yesterday, 'yyyy-MM-dd')}T00:00:00-07:00`,
      },
    );

    return productAmazon;

    const filename = await this.storageProvider.saveFile(file_name);
    const originalPath = `${uploadConfig.tmpFolder}/${filename}`;
    const { data } = ExcelToJson({
      sourceFile: originalPath,
    });
    const allProducts = data.slice(1, data.length);

    const products = allProducts.map(async product => {
      const { A, B, C, D, E, F } = product;

      let newName = A;
      const newSKU = B;
      let newAsin = C;
      const newUPC = D;
      const newNote = E;
      let newBrand = F;
      let newImage;

      const productAmazon = await this.amazonSellerProvider.getDataProduct(
        newSKU.trim(),
      );

      if (productAmazon.Items.length > 0) {
        newAsin = productAmazon.Items[0].Identifiers.MarketplaceASIN.ASIN;
        newName = productAmazon.Items[0].AttributeSets[0].Title;
        newImage = productAmazon.Items[0].AttributeSets[0].SmallImage.URL;
        newBrand = productAmazon.Items[0].AttributeSets[0].Brand;
      }

      const product_created = await this.productsRepository.create({
        name: newName,
        sku: newSKU,
        asin: newAsin,
        image: newImage,
        brand: newBrand,
        note: newNote,
        upc: newUPC,
      });

      return product_created;
    });

    await fs.promises.unlink(originalPath);
    await this.storageProvider.deleteFile(file_name);

    return Promise.all(products);
  }
}
