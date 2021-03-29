import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AlterSupplierForProductSupplierService from '@modules/products/services/AlterSupplierForProductSupplierService';
import CreateProductSupplierService from '@modules/products/services/CreateProductSupplierService';

export default class ProductSupplierController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { supplier_id, product_id, note, sku_supplier } = request.body;

    const createProductSupplier = container.resolve(
      CreateProductSupplierService,
    );

    const product = await createProductSupplier.execute({
      supplier_id,
      product_id,
      note,
      sku_supplier,
    });

    return response.json(classToClass(product));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product_supplier_id, new_supplier_id } = request.body;

    const alterSupplierForProductSupplier = container.resolve(
      AlterSupplierForProductSupplierService,
    );

    const product_supplier = await alterSupplierForProductSupplier.execute({
      id: product_supplier_id,
      new_supplier_id,
    });

    return response.json(product_supplier);
  }
}
