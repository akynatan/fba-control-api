/* eslint-disable no-await-in-loop */
import { injectable, inject } from 'tsyringe';

import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';

import ISaleRepository from '../repositories/ISaleRepository';
import ICreateSaleDTO from '../dtos/ICreateSaleDTO';

import convetSaleAmazonInFhSeller from '../scripts/convetSaleAmazonInFhSeller';

@injectable()
export default class DownloadReportNewSaleInAmazonService {
  constructor(
    @inject('SaleRepository')
    private saleRepository: ISaleRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,

    @inject('ReportAmazonRepository')
    private reportAmazonRepository: IReportAmazonRepository,
  ) {}

  public async execute(report_id_sale: string[]): Promise<any> {
    for (let i = 0; i < report_id_sale.length; i += 1) {
      const report_id = report_id_sale[i];

      const {
        processingStatus,
        reportDocumentId,
      } = await this.amazonSellerProvider.getStatusReport(report_id);

      if (processingStatus === 'DONE') {
        const sale_json_amazon: ICreateSaleDTO[] = await this.amazonSellerProvider.downloadReport(
          reportDocumentId,
        );

        for (let j = 0; j < sale_json_amazon.length; j += 1) {
          const sale = sale_json_amazon[j];
          await this.saleRepository.create(convetSaleAmazonInFhSeller(sale));
        }

        await this.reportAmazonRepository.checkDownloadedEqualTrue(report_id);
      }
    }
  }
}
