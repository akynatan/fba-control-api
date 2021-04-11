import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Shop from '../infra/typeorm/entities/Shop';
import IShopsRepository from '../repositories/IShopsRepository';

@injectable()
export default class ListAllShopsService {
  constructor(
    @inject('ShopsRepository')
    private shopsRepository: IShopsRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Shop[]> {
    const shops = await this.shopsRepository.listAll();

    return shops;
  }
}
