import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllStorageFeeService from '@modules/storage_fee/services/ListAllStorageFeeService';

export default class StorageFeeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllStorageFee = container.resolve(ListAllStorageFeeService);

    const storages = await listAllStorageFee.execute();

    return response.json(storages);
  }
}
