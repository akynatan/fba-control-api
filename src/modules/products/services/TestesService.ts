/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';

@injectable()
export default class TestesService {
  constructor(
    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,

    @inject('ReportAmazonRepository')
    private reportAmazonRepository: IReportAmazonRepository,
  ) {}

  public async execute(): Promise<any> {
    const {
      processingStatus,
      reportDocumentId,
    } = await this.amazonSellerProvider.createReport({name_report: ''});

    if (processingStatus === 'DONE') {
      const report = await this.amazonSellerProvider.downloadReport(
        reportDocumentId,
      );

      return report;
    }

    return {};
  }
}
