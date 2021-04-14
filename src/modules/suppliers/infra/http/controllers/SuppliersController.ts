import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateSupplierService from '@modules/suppliers/services/CreateSupplierService';
import ListAllSuppliersService from '@modules/suppliers/services/ListAllSuppliersService';
import DetailSupplierService from '@modules/suppliers/services/DetailSupplierService';
import ListProductsSupplierService from '@modules/suppliers/services/ListProductsSupplierService';
import UpdateSupplierService from '@modules/suppliers/services/UpdateSupplierService';

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

  public async detailSupplier(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { supplier_id } = request.query;

    const detailSupplier = container.resolve(DetailSupplierService);

    const supplier = await detailSupplier.execute({
      supplier_id: String(supplier_id),
    });

    return response.json(supplier);
  }

  public async listProductsSupplier(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { supplier_id } = request.query;

    const listProductsSupplier = container.resolve(ListProductsSupplierService);

    const products = await listProductsSupplier.execute({
      supplier_id: String(supplier_id),
    });

    return response.json(products);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, note } = request.body;

    const updateSupplier = container.resolve(UpdateSupplierService);

    const product = await updateSupplier.execute({
      id,
      note,
    });

    return response.json(product);
  }
}
