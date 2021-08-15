/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IBackOrderRepository from '../repositories/IBackOrderRepository';
import BackOrder from '../infra/typeorm/entities/BackOrder';

@injectable()
export default class ListAllBackOrderService {
  constructor(
    @inject('BackOrderRepository')
    private backOrderRepository: IBackOrderRepository,
  ) {}

  public async execute(): Promise<BackOrder[]> {
    const backorders = await this.backOrderRepository.findAll();

    return backorders;
  }
}
