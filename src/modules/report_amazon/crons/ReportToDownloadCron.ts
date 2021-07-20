import { container } from 'tsyringe';

import ListAllReportsToDownloadService from '@modules/report_amazon/services/ListAllReportsToDownloadService';
import DownloadReportsInventoryInAmazonService from '@modules/products/services/DownloadReportsInventoryInAmazonService';

export default class ReportToDownloadCron {
  public async execute(): Promise<void> {
    console.log('oii');
    const listAllReportsToDownload = container.resolve(
      ListAllReportsToDownloadService,
    );
    const downloadReportsInventoryInAmazon = container.resolve(
      DownloadReportsInventoryInAmazonService,
    );

    const reports = await listAllReportsToDownload.execute();

    const report_id_products = reports
      .filter(report => report.name === 'GET_AFN_INVENTORY_DATA')
      .map(report => report.report_id);

    await downloadReportsInventoryInAmazon.execute(report_id_products);
  }
}
