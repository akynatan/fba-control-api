import { container } from 'tsyringe';

import CreateReportInventoryInAmazonService from '@modules/products/services/CreateReportInventoryInAmazonService';

export default class UpsertShipmentsCron {
  public async execute(): Promise<void> {
    const createReportInventoryInAmazon = container.resolve(
      CreateReportInventoryInAmazonService,
    );

    createReportInventoryInAmazon.execute();
  }
}
