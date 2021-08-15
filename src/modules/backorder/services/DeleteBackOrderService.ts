import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IBackOrderRepository from '../repositories/IBackOrderRepository';
import BackOrder from '../infra/typeorm/entities/BackOrder';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteBackOrderService {
  constructor(
    @inject('BackOrderRepository')
    private backordersRepository: IBackOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({ id }: IRequest): Promise<BackOrder> {
    const backorder = await this.backordersRepository.findByID(id);

    if (!backorder) {
      throw new AppError('BackOrder not found.');
    }

    await this.backordersRepository.delete(id);

    // await this.cacheProvider.invalidate('backorders-list');

    return backorder;
  }
}
