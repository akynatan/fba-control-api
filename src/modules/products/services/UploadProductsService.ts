/* eslint-disable camelcase */
import path from 'path';
import fs from 'fs';
import { injectable, inject } from 'tsyringe';
import ExcelToJson from 'convert-excel-to-json';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';

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
  ) {}

  public async execute({ avatarFileName }: IRequest): Promise<Product[]> {
    const filename = await this.storageProvider.saveFile(avatarFileName);
    const { data } = ExcelToJson({
      sourceFile: `${uploadConfig.uploadsFolder}/${filename}`,
    });
    const allProducts = data.slice(1, data.length);

    const products = allProducts.map(async product => {
      const { A, B, C, D, E } = product;
      return this.productsRepository.create({
        name: A,
        asin: B,
        note: C,
        sku: D,
        upc: E,
      });
    });

    return Promise.all(products);
  }
}
