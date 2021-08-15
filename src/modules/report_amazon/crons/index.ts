// import UpdateShipmentsCron from '@modules/shipments/crons/UpdateShipmentsCron';
import ReportToDownloadCron from '@modules/report_amazon/crons/ReportToDownloadCron';

import cron from 'node-cron';

export default class ReportAmazonCron {
  public async execute(): Promise<void> {
    // cron.schedule('*/30 * * * *', new ReportToDownloadCron().execute);
    cron.schedule('* * * * *', new ReportToDownloadCron().execute);
  }
}
