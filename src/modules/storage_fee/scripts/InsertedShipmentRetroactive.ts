import { container } from 'tsyringe';
import { format, subDays, formatDistanceToNowStrict, addDays } from 'date-fns';

import GetLastSyncByNameRoutineService from '@modules/routines/services/GetLastSyncByNameRoutineService';
import SyncAllShipmentsService from '@modules/shipments/services/SyncAllShipmentsService';

export default class InsertedShipmentRetroactive {
  public async execute(): Promise<void> {
    const getLastSyncByNameRoutine = container.resolve(
      GetLastSyncByNameRoutineService,
    );
    const syncAllShipments = container.resolve(SyncAllShipmentsService);

    const date_last_updated = await getLastSyncByNameRoutine.execute({
      name_routine: 'get_shipments',
    });

    if (date_last_updated) {
      return;
    }

    let date_initial = new Date('2021-01-02');
    let date_finally = subDays(date_initial, 1);

    const diference_in_days = Number(
      formatDistanceToNowStrict(date_initial, {
        unit: 'day',
      }).split(' ')[0],
    );

    for (let i = 0; i < diference_in_days; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      await syncAllShipments.execute({
        date_init: `${format(date_initial, 'yyyy-MM-dd')}T00:00:00+00:00`,
        date_finally: `${format(date_finally, 'yyyy-MM-dd')}T00:00:00+00:00`,
      });

      date_initial = addDays(date_initial, 1);
      date_finally = addDays(date_finally, 1);
    }
  }
}
