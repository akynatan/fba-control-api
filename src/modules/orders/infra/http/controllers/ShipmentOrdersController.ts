import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateShipmentOrdersService from '@modules/orders/services/CreateShipmentOrdersService';
import DeleteShipmentOrderService from '@modules/orders/services/DeleteShipmentOrderService';
import ListShipmentFromOrderService from '@modules/orders/services/ListShipmentFromOrderService';
import UpdateShipmentOrdersService from '@modules/orders/services/UpdateShipmentOrdersService';
import SyncManyShipmentOrderService from '@modules/orders/services/SyncManyShipmentOrderService';

export default class ShipmentOrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { order_id, shipment_id, note } = request.body;

    const createShipmentOrders = container.resolve(CreateShipmentOrdersService);

    const shipment_order = await createShipmentOrders.execute({
      order_id,
      shipment_id,
      note,
    });

    return response.json(shipment_order);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { shipment_order_id, shipment_id, note } = request.body;

    const updateShipmentOrders = container.resolve(UpdateShipmentOrdersService);

    const shipment_order = await updateShipmentOrders.execute({
      shipment_order_id,
      shipment_id,
      note,
    });

    return response.json(shipment_order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.body;

    const deleteShipmentOrder = container.resolve(DeleteShipmentOrderService);

    await deleteShipmentOrder.execute({
      id,
    });

    return response.json({});
  }

  public async syncMany(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { shipments_order_id } = request.body;

    const syncManyShipmentOrder = container.resolve(
      SyncManyShipmentOrderService,
    );

    const shipments = await syncManyShipmentOrder.execute({
      shipments_order_id,
    });

    return response.json(shipments);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.query;

    const listShipmentFromOrder = container.resolve(
      ListShipmentFromOrderService,
    );

    const shipment = await listShipmentFromOrder.execute({
      order_id: String(order_id),
    });

    return response.json(shipment);
  }
}
