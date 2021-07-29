/* eslint-disable no-await-in-loop */
import { injectable, inject } from 'tsyringe';

import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';

import ISaleRepository from '../repositories/ISaleRepository';
import ICreateSaleDTO from '../dtos/ICreateSaleDTO';

import convetSaleAmazonInFhSeller from '../scripts/convetSaleAmazonInFhSeller';

@injectable()
export default class DownloadReportUpdatedSaleInAmazonService {
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

        await Promise.all(
          sale_json_amazon.map(async sale_amazon_2 => {
            const sale_amazon = convetSaleAmazonInFhSeller(sale_amazon_2);

            const sale = await this.saleRepository.findByAmazonOrderId(
              sale_amazon.amazon_order_id,
            );

            if (!sale) {
              return this.saleRepository.create(sale_amazon);
            }

            return this.saleRepository.save({
              id: sale.id,
              ...sale_amazon,
              created_at: sale.created_at,
              updated_at: sale.updated_at,
            });
          }),
        );

        await this.reportAmazonRepository.checkDownloadedEqualTrue(report_id);
      }
    }
  }
}
