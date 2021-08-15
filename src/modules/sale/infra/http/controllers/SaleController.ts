import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllSaleService from '@modules/sale/services/ListAllSaleService';

export default class SaleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllSale = container.resolve(ListAllSaleService);

    const sales = await listAllSale.execute();

    return response.json(sales);
  }
}
