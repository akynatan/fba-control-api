// import UpdateShipmentsCron from '@modules/shipments/crons/UpdateShipmentsCron';
import CreateReportNewSaleInAmazonServiceCron from '@modules/sale/crons/CreateReportNewSaleInAmazonServiceCron';
import CreateReportUpdatedSaleInAmazonServiceCron from '@modules/sale/crons/CreateReportUpdatedSaleInAmazonServiceCron';

import cron from 'node-cron';

export default class SaleCron {
  public async execute(): Promise<void> {
    cron.schedule(
      '0 2 * * *',
      new CreateReportNewSaleInAmazonServiceCron().execute,
    );
    cron.schedule(
      '0 2 * * *',
      new CreateReportUpdatedSaleInAmazonServiceCron().execute,
    );
  }
}
