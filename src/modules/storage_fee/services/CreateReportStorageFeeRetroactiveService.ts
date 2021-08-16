/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ILogRoutineRepository from '@modules/routines/repositories/ILogRoutineRepository';

@injectable()
export default class CreateReportStorageFeeRetroactiveService {
  constructor(
    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,

    @inject('ReportAmazonRepository')
    private reportAmazonRepository: IReportAmazonRepository,

    @inject('LogRoutineRepository')
    private logRoutineRepository: ILogRoutineRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<void> {
    await this.logRoutineRepository.create({
      name_routine: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
    });

    const {
      reportId,
    } = await this.amazonSellerProvider.createReportWithDateStartEnd({
      name_report: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
      date_start: '2021-04-01T00:00:00+00:00',
      date_end: '2021-07-31T00:00:00+00:00',
    });

    await this.reportAmazonRepository.create({
      name: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
      report_id: reportId,
    });

    await this.logRoutineRepository.create({
      name_routine: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
    });

    await this.cacheProvider.invalidate('ALL_REPORTS_TO_DOWNLOAD');
  }
}
