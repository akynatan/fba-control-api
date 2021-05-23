import { container } from 'tsyringe';

import ListAllShipmentsService from '@modules/orders/services/ListAllShipmentsService';
import SyncManyShipmentOrderService from '@modules/orders/services/SyncManyShipmentOrderService';

export default class UpdateShipmentsCron {
  public async execute(): Promise<void> {
    const listAllShipments = container.resolve(ListAllShipmentsService);
    const syncManyShipmentOrder = container.resolve(
      SyncManyShipmentOrderService,
    );

    const all_shipments = await listAllShipments.execute();

    const shipments_order_id = all_shipments
      .filter(
        shipment =>
          shipment.status !== 'CLOSED' && shipment.status !== 'DELETED',
      )
      .map(shipment => shipment.id);

    await syncManyShipmentOrder.execute({
      shipments_order_id,
    });
  }
}
