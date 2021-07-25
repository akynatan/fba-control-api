/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { subDays, getDaysInMonth, format } from 'date-fns';

import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ILogRoutineRepository from '@modules/routines/repositories/ILogRoutineRepository';

@injectable()
export default class CreateReportStorageFeeInAmazonService {
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
    const lastDayOfMonthLast = subDays(new Date(), 1);

    const { reportId } = await this.amazonSellerProvider.createReportStorageFee(
      {
        name_report: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
        date_start: `${format(
          lastDayOfMonthLast,
          'yyyy-MM',
        )}-01T00:00:00+00:00`,
        date_end: `${format(lastDayOfMonthLast, 'yyyy-MM-dd')}T23:59:59+00:00`,
      },
    );

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
