import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import CreateShopService from '@modules/shops/services/CreateShopService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, token_hubspot, token_amazon } = request.body;

    const createShop = container.resolve(CreateShopService);

    const shop = await createShop.execute({
      name,
      token_hubspot,
      token_amazon,
    });

    return response.json(classToClass(shop));
  }
}
