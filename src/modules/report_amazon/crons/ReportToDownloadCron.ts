import { container } from 'tsyringe';

import ListAllReportsToDownloadService from '@modules/report_amazon/services/ListAllReportsToDownloadService';
import DownloadReportsInventoryInAmazonService from '@modules/products/services/DownloadReportsInventoryInAmazonService';
import DownloadReportStorageFeeInAmazonService from '@modules/storage_fee/services/DownloadReportStorageFeeInAmazonService';
import DownloadReportNewSaleInAmazonService from '@modules/sale/services/DownloadReportNewSaleInAmazonService';
import DownloadReportUpdatedSaleInAmazonService from '@modules/sale/services/DownloadReportUpdatedSaleInAmazonService';

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
    const downloadReportNewSaleInAmazon = container.resolve(
      DownloadReportNewSaleInAmazonService,
    );
    const downloadReportUpdatedSaleInAmazon = container.resolve(
      DownloadReportUpdatedSaleInAmazonService,
    );

    const reports = await listAllReportsToDownload.execute();

    const report_id_products = reports
      .filter(report => report.name === 'GET_AFN_INVENTORY_DATA')
      .map(report => report.report_id);

    await downloadReportsInventoryInAmazon.execute(report_id_products);

    const report_id_storage_fee = reports
      .filter(report => report.name === 'GET_FBA_STORAGE_FEE_CHARGES_DATA')
      .map(report => report.report_id);

    await downloadReportStorageFeeInAmazon.execute(report_id_storage_fee);

    const report_id_new_sale = reports
      .filter(
        report =>
          report.name === 'GET_FLAT_FILE_ALL_ORDERS_DATA_BY_ORDER_DATE_GENERAL',
      )
      .map(report => report.report_id);

    await downloadReportNewSaleInAmazon.execute(report_id_new_sale);

    const report_id_updated_sale = reports
      .filter(
        report =>
          report.name ===
          'GET_FLAT_FILE_ALL_ORDERS_DATA_BY_LAST_UPDATE_GENERAL',
      )
      .map(report => report.report_id);

    console.log(report_id_updated_sale);

    await downloadReportUpdatedSaleInAmazon.execute(report_id_updated_sale);
  }
}
