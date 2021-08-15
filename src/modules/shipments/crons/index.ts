// import UpdateShipmentsCron from '@modules/shipments/crons/UpdateShipmentsCron';
import UpsertShipmentsCron from '@modules/shipments/crons/UpsertShipmentsCron';

import cron from 'node-cron';

export default class ShipmentsCron {
  public async execute(): Promise<void> {
    // cron.schedule('0 0 * * *', new UpdateShipmentsCron().execute);
    cron.schedule('0 0 * * *', new UpsertShipmentsCron().execute);
  }
}
