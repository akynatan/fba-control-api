import { container } from 'tsyringe';

import SyncSuppliersHubspotService from '@modules/suppliers/services/SyncSuppliersHubspotService';

export default class SyncSuppliersCron {
  public async execute(): Promise<void> {
    const SyncSuppliersHubspot = container.resolve(SyncSuppliersHubspotService);

    await SyncSuppliersHubspot.execute();
  }
}
