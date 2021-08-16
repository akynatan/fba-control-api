import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllStorageFeeService from '@modules/storage_fee/services/ListAllStorageFeeService';
import CreateReportStorageFeeRetroactiveService from '@modules/storage_fee/services/CreateReportStorageFeeRetroactiveService';

export default class StorageFeeController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllStorageFee = container.resolve(ListAllStorageFeeService);

    const storages = await listAllStorageFee.execute();

    return response.json(storages);
  }

  public async retroactive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createReportStorageFeeRetroactive = container.resolve(
      CreateReportStorageFeeRetroactiveService,
    );

    const retroactive = await createReportStorageFeeRetroactive.execute();

    return response.json(retroactive);
  }
}
