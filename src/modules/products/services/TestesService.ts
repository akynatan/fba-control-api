/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import { subDays, getMonth, format } from 'date-fns';

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
    // const {
    //   processingStatus,
    //   reportDocumentId,
    // } = await this.amazonSellerProvider.createReport({
    //   name_report: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
    // });
    // const oiii = await this.amazonSellerProvider.createReport({
    //   name_report: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
    // });
    // const oiii = await this.amazonSellerProvider.manageReports();
    // 371307018828
    // 371303018828
    // 371314018828
    // 377769018833
    // 367973018825
    // 377811018833
    const {
      processingStatus,
      reportDocumentId,
    } = await this.amazonSellerProvider.getStatusReport('311760018747');
    console.log(processingStatus);
    console.log(reportDocumentId);
    // if (processingStatus === 'DONE') {
    const report = await this.amazonSellerProvider.downloadReport(
      reportDocumentId,
    );
    return report;
    // const lastDayOfMonthLast = subDays(new Date(2021, 6, 1), 1);
    // const { reportId } = await this.amazonSellerProvider.createReportStorageFee(
    //   {
    //     name_report: 'GET_FBA_STORAGE_FEE_CHARGES_DATA',
    //     date_start: `${format(
    //       lastDayOfMonthLast,
    //       'yyyy-MM',
    //     )}-01T00:00:00+00:00`,
    //     date_end: `${format(lastDayOfMonthLast, 'yyyy-MM-dd')}T23:59:59+00:00`,
    //   },
    // );
    // return { reportId };
    // const reports = await this.amazonSellerProvider.getReportSchedulesByReportType(
    //   'GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL',
    // );
    // return reports;
    // const report = await this.amazonSellerProvider.manageReportSchedule(
    //   'GET_FBA_STORAGE_FEE_CHARGES_DATA',
    // );
  }
}
