import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';

export default class SuppliersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, note, tel, mail, domain } = request.body;

    const CreateSupplier = container.resolve(CreateSupplierService);

    const supplier = await CreateSupplier.execute({
      name,
      note,
      tel,
      mail,
      domain,
    });

    return response.json(supplier);
  }
}
