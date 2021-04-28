import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateProductsOrderService from '@modules/orders/services/CreateProductsOrderService';
import ListAllProductsOrderService from '@modules/orders/services/ListAllProductsOrderService';
import DetailProductsOrderService from '@modules/orders/services/DetailProductsOrderService';
import DeleteProductsOrderService from '@modules/orders/services/DeleteProductsOrderService';
import UpdateFeesEstimateService from '@modules/orders/services/UpdateFeesEstimateService';
import UpdateAllProductsOrderService from '@modules/orders/services/UpdateAllProductsOrderService';

export default class ProductsOrderController {
  public async create(request: Request, response: Response): Promise<Response> {
    const {
      product_id,
      order_id,
      unit_price,
      qtd,
      label,
      prep,
      other_cost,
      buy_box,
      note,
    } = request.body;

    const createProductsOrder = container.resolve(CreateProductsOrderService);

    const product_order = await createProductsOrder.execute({
      product_id,
      order_id,
      unit_price,
      qtd,
      label,
      prep,
      other_cost,
      buy_box,
      note,
    });

    return response.json(product_order);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { data } = request.body;

    const updateAllProductsOrder = container.resolve(
      UpdateAllProductsOrderService,
    );

    const products_order = await updateAllProductsOrder.execute(data);

    return response.json(products_order);
  }

  public async updateEstimate(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { product_order_id, asin, buy_box } = request.body;

    const updateFeesEstimate = container.resolve(UpdateFeesEstimateService);

    const product_order = await updateFeesEstimate.execute({
      product_order_id,
      asin,
      buy_box,
    });

    return response.json(product_order);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { product_order_id } = request.body;

    const deleteProductsOrder = container.resolve(DeleteProductsOrderService);

    await deleteProductsOrder.execute({
      id: product_order_id,
    });

    return response.json({});
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