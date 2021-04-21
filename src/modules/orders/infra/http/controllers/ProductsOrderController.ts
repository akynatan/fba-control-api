import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductsOrderService from '@modules/orders/services/CreateProductsOrderService';
import ListAllProductsOrderService from '@modules/orders/services/ListAllProductsOrderService';
import DetailProductsOrderService from '@modules/orders/services/DetailProductsOrderService';

export default class ProductsOrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { product_id, order_id, unit_price, qtd } = request.body;

    const createProductsOrder = container.resolve(CreateProductsOrderService);

    const product_order = await createProductsOrder.execute({
      product_id,
      order_id,
      unit_price,
      qtd,
    });

    return response.json(product_order);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const listAllProductsOrder = container.resolve(ListAllProductsOrderService);

    const products_order = await listAllProductsOrder.execute();

    return response.json(products_order);
  }

  public async detail(request: Request, response: Response): Promise<Response> {
    const { product_order_id } = request.query;

    const detailProductsOrder = container.resolve(DetailProductsOrderService);

    const product_order = await detailProductsOrder.execute({
      product_order_id: String(product_order_id),
    });

    return response.json(product_order);
  }
}
