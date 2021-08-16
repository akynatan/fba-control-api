// import UpdateShipmentsCron from '@modules/shipments/crons/UpdateShipmentsCron';
import CreateReportStorageFeeInAmazonServiceCron from '@modules/storage_fee/crons/CreateReportStorageFeeInAmazonServiceCron';

import cron from 'node-cron';

export default class StorageFeeCron {
  public async execute(): Promise<void> {
    cron.schedule(
      '0 0 30 * *',
      new CreateReportStorageFeeInAmazonServiceCron().execute,
    );
  }
}
