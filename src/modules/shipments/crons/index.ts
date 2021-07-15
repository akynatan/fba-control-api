// import UpdateShipmentsCron from '@modules/shipments/crons/UpdateShipmentsCron';
import InsertedShipmentsCron from '@modules/shipments/crons/InsertedShipmentsCron';

import cron from 'node-cron';
import InsertedShipmentRetroactive from '../scripts/InsertedShipmentRetroactive';

export default class ShipmentsCron {
  public async execute(): Promise<void> {
    // cron.schedule('0 0 * * *', new UpdateShipmentsCron().execute);
    cron.schedule('0 0 * * *', new InsertedShipmentsCron().execute);

    // setTimeout(() => {
    //   new InsertedShipmentRetroactive().execute();
    // }, 10000);
  }
}
