/* eslint-disable no-await-in-loop */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';
import Product from '../infra/typeorm/entities/Product';
import SyncDataProductByAmazonService from './SyncDataProductByAmazonService';

import IProductsRepository from '../repositories/IProductsRepository';
import IProductSupplierRepository from '../repositories/IProductSupplierRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

interface IResponseJSONDonwloadReportAmazon {
  'seller-sku': string;
  asin: string;
  'Quantity Available': string;
}

@injectable()
export default class DownloadReportsInventoryInAmazonService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,

    @inject('ReportAmazonRepository')
    private reportAmazonRepository: IReportAmazonRepository,
  ) {}

  public async execute(report_id_products: string[]): Promise<any> {
    console.log('iniciou');

    for (let i = 0; i < report_id_products.length; i += 1) {
      const report_id = report_id_products[i];

      const {
        processingStatus,
        reportDocumentId,
      } = await this.amazonSellerProvider.getStatusReport(report_id);

      if (processingStatus === 'DONE') {
        const products_json_amazon: IResponseJSONDonwloadReportAmazon[] = await this.amazonSellerProvider.downloadReport(
          reportDocumentId,
        );

        for (let j = 0; j < products_json_amazon.length; j += 1) {
          const product_to_upsert = products_json_amazon[j];

          const all_products = await this.productsRepository.findBySKU(
            product_to_upsert['seller-sku'],
          );

          if (all_products.length <= 0) {
            this.cadastra_product(
              product_to_upsert['seller-sku'],
              product_to_upsert.asin,
            );
          }
        }
      }
    }
  }

  public async cadastra_product(sku: string, asin: string): Promise<any> {
    console.log(`cadastra product ${sku}`);
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

      if (
        preps &&
        preps.ASINPrepInstructionsList &&
        preps.ASINPrepInstructionsList.length > 0
      ) {
        preps_string = preps.ASINPrepInstructionsList[0].PrepInstructionList.join(
          ', ',
        );
        label = preps.ASINPrepInstructionsList[0].BarcodeInstruction;
      }
    }

    const product = await this.productsRepository.create({
      asin: newAsin,
      name: newName,
      image: newImage,
      brand: newBrand,
      sku,
      prep: preps_string,
      label,
    });

    await this.cacheProvider.invalidate('products-list');

    return product;
  }
}
