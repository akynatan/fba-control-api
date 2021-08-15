import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListAllSaleService from '@modules/sale/services/ListAllSaleService';
import CreateReportNewSaleRetroactiveService from '@modules/sale/services/CreateReportNewSaleRetroactiveService';
import CreateReportUpdatedSaleRetroactiveService from '@modules/sale/services/CreateReportUpdatedSaleRetroactiveService';

export default class SaleController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listAllSale = container.resolve(ListAllSaleService);

    const sales = await listAllSale.execute();

    return response.json(sales);
  }

  public async retroactive(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const createReportNewSaleRetroactive = container.resolve(
      CreateReportNewSaleRetroactiveService,
    );
    const createReportUpdatedSaleRetroactive = container.resolve(
      CreateReportUpdatedSaleRetroactiveService,
    );

    const newsale = await createReportNewSaleRetroactive.execute();
    const updatesale = await createReportUpdatedSaleRetroactive.execute();

    return response.json({ newsale, updatesale });
  }
}
