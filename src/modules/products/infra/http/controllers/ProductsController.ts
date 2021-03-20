import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateProductService from '@modules/products/services/CreateProductService';
import listAllProductsService from '@modules/products/services/ListAllProductsService';
import UpdateProductService from '@modules/products/services/UpdateProductService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, asin, note, sku, upc, suppliers } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      name,
      asin,
      note,
      sku,
      upc,
      suppliers,
    });

    return response.json(classToClass(product));
  }

  public async index(_: Request, response: Response): Promise<Response> {
    const listAllProducts = container.resolve(listAllProductsService);

    const products = await listAllProducts.execute();

    return response.json(classToClass(products));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { product_id, name, asin, note, sku, upc } = request.body;

    const updateProduct = container.resolve(UpdateProductService);

    const product = await updateProduct.execute({
      product_id,
      name,
      asin,
      note,
      sku,
      upc,
    });

    return response.json(product);
  }
}
