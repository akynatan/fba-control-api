import UpdateShipmentsCron from '@modules/shipments/crons/UpdateShipmentsCron';
import cron from 'node-cron';

export default class ShipmentsCron {
  public async execute(): Promise<void> {
    const updateShipments = new UpdateShipmentsCron();
    cron.schedule('0 0 * * *', updateShipments.execute);
  }
}
