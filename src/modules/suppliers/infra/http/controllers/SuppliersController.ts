import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';
import ListAllSuppliersService from '@modules/suppliers/services/ListAllSuppliersService';

export default class SuppliersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, note, tel, mail, domain } = request.body;

    const createSupplier = container.resolve(CreateSupplierService);

    const supplier = await createSupplier.execute({
      name,
      note,
      tel,
      mail,
      domain,
    });

    return response.json(supplier);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllSuppliersService = container.resolve(ListAllSuppliersService);

    const suppliers = await listAllSuppliersService.execute();

    return response.json(suppliers);
  }
}
