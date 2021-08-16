import CreateReportInventoryInAmazonServiceCron from '@modules/products/crons/CreateReportInventoryInAmazonServiceCron';

import cron from 'node-cron';

export default class ProductsCron {
  public async execute(): Promise<void> {
    cron.schedule(
      '0 */3 * * *',
      new CreateReportInventoryInAmazonServiceCron().execute,
    );
  }
}
