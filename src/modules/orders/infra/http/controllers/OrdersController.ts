import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListAllOrdersService from '@modules/orders/services/ListAllOrdersService';
import DetailOrderService from '@modules/orders/services/DetailOrderService';
import GetProductsByOrderService from '@modules/orders/services/GetProductsByOrderService';
import UpdateOrderService from '@modules/orders/services/UpdateOrderService';
import DeleteOrderService from '@modules/orders/services/DeleteOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      date,
      supplier_id,
      form_payment,
      other_cost,
      shipment_cost,
      its_paid,
      status,
      note,
    } = request.body;

    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute({
      date,
      supplier_id,
      form_payment,
      its_paid,
      other_cost,
      shipment_cost,
      status,
      note,
    });

    return response.json(order);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      order_id,
      supplier_id,
      date,
      invoice,
      other_cost,
      shipment_cost,
      form_payment,
      its_paid,
      status,
    } = request.body;

    const updateOrder = container.resolve(UpdateOrderService);

    const order = await updateOrder.execute({
      order_id,
      supplier_id,
      date,
      invoice,
      other_cost,
      shipment_cost,
      form_payment,
      its_paid,
      status,
    });

    return response.json(order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;

    const deleteOrder = container.resolve(DeleteOrderService);

    await deleteOrder.execute({
      id: order_id,
    });

    return response.json({});
  }

  public async index(_: Request, response: Response): Promise<Response> {
    const listAllOrders = container.resolve(ListAllOrdersService);

    const orders = await listAllOrders.execute();

    return response.json(orders);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.query;
    const detailOrder = container.resolve(DetailOrderService);

    const order = await detailOrder.execute({
      order_id: String(order_id),
    });

    return response.json(order);
  }

  public async products(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { order_id } = request.query;
    const getProductsByOrder = container.resolve(GetProductsByOrderService);

    const order = await getProductsByOrder.execute({
      order_id: String(order_id),
    });

    return response.json(order);
  }
}
