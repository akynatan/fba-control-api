import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateOrderService from '@modules/orders/services/CreateOrderService';
import ListAllOrdersService from '@modules/orders/services/ListAllOrdersService';
import DetailOrderService from '@modules/orders/services/DetailOrderService';
import GetProductsByOrderService from '@modules/orders/services/GetProductsByOrderService';

export default class OrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      date,
      supplier_id,
      form_payment,
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
      status,
      note,
    });

    return response.json(order);
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
