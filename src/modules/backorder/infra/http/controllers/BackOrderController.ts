import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateBackOrderService from '@modules/backorder/services/CreateBackOrderService';
import ListAllBackOrderService from '@modules/backorder/services/ListAllBackOrderService';
import UpdateBackOrderService from '@modules/backorder/services/UpdateBackOrderService';
import DeleteBackOrderService from '@modules/backorder/services/DeleteBackOrderService';

export default class BackOrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      buy_box,
      estimate_profit,
      eta,
      note,
      product_id,
      supplier_id,
      unit_price,
      qtd,
    } = request.body;

    const createBackOrder = container.resolve(CreateBackOrderService);

    const backorder = await createBackOrder.execute({
      buy_box,
      estimate_profit,
      eta,
      note,
      product_id,
      supplier_id,
      unit_price,
      qtd,
    });

    return response.json(classToClass(backorder));
  }

  public async index(_: Request, response: Response): Promise<Response> {
    const listAllBackOrder = container.resolve(ListAllBackOrderService);

    const backorders = await listAllBackOrder.execute();

    return response.json(classToClass(backorders));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const {
      back_order_id,
      supplier_id,
      product_id,
      qtd,
      unit_price,
      eta,
      buy_box,
      estimate_profit,
      note,
    } = request.body;

    const updateBackOrder = container.resolve(UpdateBackOrderService);

    const backorder = await updateBackOrder.execute({
      back_order_id,
      supplier_id,
      product_id,
      qtd,
      unit_price,
      eta,
      buy_box,
      estimate_profit,
      note,
    });

    return response.json(backorder);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { backorder_id } = request.body;

    const deleteBackOrder = container.resolve(DeleteBackOrderService);

    const backorder = await deleteBackOrder.execute({
      id: backorder_id,
    });

    return response.json(backorder);
  }
}
