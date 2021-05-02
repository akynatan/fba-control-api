/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
export default class DeleteOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<void> {
    const product = await this.ordersRepository.findByID(id);

    if (!product) {
      throw new AppError('Shipment not found');
    }

    await this.ordersRepository.delete(id);
  }
}
