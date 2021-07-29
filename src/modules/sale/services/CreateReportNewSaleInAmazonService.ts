/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { subDays, format } from 'date-fns';

import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ILogRoutineRepository from '@modules/routines/repositories/ILogRoutineRepository';

@injectable()
export default class CreateReportNewSaleInAmazonService {
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
    const name_report = 'GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL';
    const lastDayOfMonthLast = subDays(new Date(), 1);

    const {
      reportId,
    } = await this.amazonSellerProvider.createReportWithDateStartEnd({
      name_report,
      date_start: `${format(lastDayOfMonthLast, 'yyyy-MM-dd')}T00:00:00+00:00`,
      date_end: `${format(lastDayOfMonthLast, 'yyyy-MM-dd')}T23:59:59+00:00`,
    });

    await this.reportAmazonRepository.create({
      name: name_report,
      report_id: reportId,
    });

    await this.logRoutineRepository.create({
      name_routine: name_report,
    });

    await this.cacheProvider.invalidate('ALL_REPORTS_TO_DOWNLOAD');
  }
}
