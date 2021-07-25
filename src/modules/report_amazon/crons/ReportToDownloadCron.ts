import { container } from 'tsyringe';

import ListAllReportsToDownloadService from '@modules/report_amazon/services/ListAllReportsToDownloadService';
import DownloadReportsInventoryInAmazonService from '@modules/products/services/DownloadReportsInventoryInAmazonService';
import DownloadReportStorageFeeInAmazonService from '@modules/storage_fee/services/DownloadReportStorageFeeInAmazonService';

export default class ReportToDownloadCron {
  public async execute(): Promise<void> {
    const listAllReportsToDownload = container.resolve(
      ListAllReportsToDownloadService,
    );
    const downloadReportsInventoryInAmazon = container.resolve(
      DownloadReportsInventoryInAmazonService,
    );
    const downloadReportStorageFeeInAmazon = container.resolve(
      DownloadReportStorageFeeInAmazonService,
    );

    const reports = await listAllReportsToDownload.execute();
    console.log(reports);

    const report_id_products = reports
      .filter(report => report.name === 'GET_AFN_INVENTORY_DATA')
      .map(report => report.report_id);

    downloadReportsInventoryInAmazon.execute(report_id_products);

    const report_id_storage_fee = reports
      .filter(report => report.name === 'GET_FBA_STORAGE_FEE_CHARGES_DATA')
      .map(report => report.report_id);

    await downloadReportStorageFeeInAmazon.execute(report_id_storage_fee);
  }
}
