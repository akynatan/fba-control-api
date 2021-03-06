/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ILogRoutineRepository from '@modules/routines/repositories/ILogRoutineRepository';

@injectable()
export default class CreateReportInventoryInAmazonService {
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
    const { reportId } = await this.amazonSellerProvider.createReport({
      name_report: 'GET_AFN_INVENTORY_DATA',
    });

    await this.reportAmazonRepository.create({
      name: 'GET_AFN_INVENTORY_DATA',
      report_id: reportId,
    });

    await this.logRoutineRepository.create({
      name_routine: 'GET_AFN_INVENTORY_DATA',
    });

    await this.cacheProvider.invalidate('ALL_REPORTS_TO_DOWNLOAD');
  }
}
