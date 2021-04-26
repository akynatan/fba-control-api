import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateFilesOrdersService from '@modules/orders/services/CreateFilesOrdersService';
import DeleteFilesOrderService from '@modules/orders/services/DeleteFilesOrderService';
import ListFilesFromOrderService from '@modules/orders/services/ListFilesFromOrderService';

export default class FilesOrdersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.body;
    const { originalname, filename } = request.file;

    const createFilesOrders = container.resolve(CreateFilesOrdersService);

    const file_order = await createFilesOrders.execute({
      order_id,
      fileName: filename,
      originalname,
    });

    return response.json(file_order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.query;

    const deleteFilesOrder = container.resolve(DeleteFilesOrderService);

    await deleteFilesOrder.execute({
      id: String(id),
    });

    return response.json({});
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { order_id } = request.query;

    const listFilesFromOrder = container.resolve(ListFilesFromOrderService);

    const files_order = await listFilesFromOrder.execute({
      order_id: String(order_id),
    });

    return response.json(files_order);
  }
}
