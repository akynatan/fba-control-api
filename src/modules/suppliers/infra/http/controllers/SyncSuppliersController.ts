import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SyncSuppliersHubspotService from '@modules/suppliers/services/SyncSuppliersHubspotService';

export default class SyncSuppliersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const SyncSuppliersHubspot = container.resolve(SyncSuppliersHubspotService);

    const suppliers = await SyncSuppliersHubspot.execute();

    console.log(suppliers);

    return response.json(suppliers);
  }
}
