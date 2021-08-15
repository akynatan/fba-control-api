import { container } from 'tsyringe';

import CreateReportNewSaleInAmazonService from '@modules/sale/services/CreateReportNewSaleInAmazonService';

export default class CreateReportNewSaleInAmazonServiceCron {
  public async execute(): Promise<void> {
    const createReportNewSaleInAmazon = container.resolve(
      CreateReportNewSaleInAmazonService,
    );

    createReportNewSaleInAmazon.execute();
  }
}
