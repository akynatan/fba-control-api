/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import ExcelToJson from 'convert-excel-to-json';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';

import Product from '../infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';

interface IRequest {
  avatarFileName: string;
}

@injectable()
export default class UploadProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({ avatarFileName }: IRequest): Promise<Product[]> {
    const filename = await this.storageProvider.saveFile(avatarFileName);
    console.log('-------------------------------------------');
    console.log(uploadConfig.uploadsFolder);
    const { data } = ExcelToJson({
      sourceFile: `${uploadConfig.uploadsFolder}/${filename}`,
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

      console.log(newSKU);
      const productAmazon = await this.amazonSellerProvider.getDataProduct(
        newSKU,
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

    return Promise.all(products);
  }
}
