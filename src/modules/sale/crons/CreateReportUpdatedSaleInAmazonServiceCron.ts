import { container } from 'tsyringe';

import CreateReportUpdatedSaleInAmazonService from '@modules/sale/services/CreateReportUpdatedSaleInAmazonService';

export default class CreateReportUpdatedSaleInAmazonServiceCron {
  public async execute(): Promise<void> {
    const createReportUpdatedSaleInAmazon = container.resolve(
      CreateReportUpdatedSaleInAmazonService,
    );

    createReportUpdatedSaleInAmazon.execute();
  }
}
