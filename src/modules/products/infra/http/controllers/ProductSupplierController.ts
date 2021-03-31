import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import UpdateProductSupplierService from '@modules/products/services/UpdateProductSupplierService';
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
    const {
      product_supplier_id,
      supplier_id,
      note,
      sku_supplier,
    } = request.body;

    const updateProductSupplier = container.resolve(
      UpdateProductSupplierService,
    );

    const product_supplier = await updateProductSupplier.execute({
      product_supplier_id,
      supplier_id,
      note,
      sku_supplier,
    });

    return response.json(product_supplier);
  }
}
