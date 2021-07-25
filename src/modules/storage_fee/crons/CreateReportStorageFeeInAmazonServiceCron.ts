import { container } from 'tsyringe';

import CreateReportStorageFeeInAmazonService from '@modules/storage_fee/services/CreateReportStorageFeeInAmazonService';

export default class CreateReportStorageFeeInAmazonServiceCron {
  public async execute(): Promise<void> {
    const createReportStorageFeeInAmazon = container.resolve(
      CreateReportStorageFeeInAmazonService,
    );

    createReportStorageFeeInAmazon.execute();
  }
}
