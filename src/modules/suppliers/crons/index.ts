import SyncSuppliersCron from '@modules/suppliers/crons/SyncSuppliersCron';
import cron from 'node-cron';

export default class CronsSuppliers {
  public async execute(): Promise<void> {
    const syncSuppliers = new SyncSuppliersCron();
    cron.schedule('0 0 * * *', syncSuppliers.execute);
  }
}
