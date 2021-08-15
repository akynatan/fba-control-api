import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ReportAmazon from '../infra/typeorm/entities/ReportAmazon';
import IReportAmazonRepository from '../repositories/IReportAmazonRepository';

@injectable()
export default class ListAllReportsToDownloadService {
  constructor(
    @inject('ReportAmazonRepository')
    private reportAmazonRepository: IReportAmazonRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<ReportAmazon[]> {
    try {
      let reports = await this.cacheProvider.recover<ReportAmazon[]>(
        'ALL_REPORTS_TO_DOWNLOAD',
      );

      if (!reports)
        reports = await this.reportAmazonRepository.findAllToDownload();

      return reports;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}
