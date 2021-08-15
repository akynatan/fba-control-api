import { container } from 'tsyringe';
import { format, subDays } from 'date-fns';

import GetLastSyncByNameRoutineService from '@modules/routines/services/GetLastSyncByNameRoutineService';
import SyncAllShipmentsService from '@modules/shipments/services/SyncAllShipmentsService';

export default class UpsertShipmentsCron {
  public async execute(): Promise<void> {
    const getLastSyncByNameRoutine = container.resolve(
      GetLastSyncByNameRoutineService,
    );
    const syncAllShipments = container.resolve(SyncAllShipmentsService);

    const date_last_updated = await getLastSyncByNameRoutine.execute({
      name_routine: 'get_shipments',
    });

    let today;
    let yesterday;

    if (!date_last_updated) {
      today = new Date();
      yesterday = subDays(today, 1);
    } else {
      today = date_last_updated.created_at;
      yesterday = subDays(today, 1);
    }

    await syncAllShipments.execute({
      date_init: `${format(today, 'yyyy-MM-dd')}T00:00:00+00:00`,
      date_finally: `${format(yesterday, 'yyyy-MM-dd')}T00:00:00+00:00`,
    });
  }
}
