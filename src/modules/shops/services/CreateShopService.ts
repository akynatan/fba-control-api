import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Shop from '../infra/typeorm/entities/Shop';
import IShopsRepository from '../repositories/IShopsRepository';

import ICreateShopDTO from '../dtos/ICreateShopDTO';

@injectable()
export default class CreateShopService {
  constructor(
    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    token_amazon,
    token_hubspot,
  }: ICreateShopDTO): Promise<Shop> {
    const checkShopExists = await this.shopsRepository.findByName(name);

    if (checkShopExists) {
      throw new AppError('Name already used.');
    }

    const shop = await this.shopsRepository.create({
      name,
      token_amazon,
      token_hubspot,
    });

    await this.cacheProvider.invalidatePrefix('shops-list');

    return shop;
  }
}
