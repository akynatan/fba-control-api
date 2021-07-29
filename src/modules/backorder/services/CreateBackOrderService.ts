import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import BackOrder from '../infra/typeorm/entities/BackOrder';
import IBackOrderRepository from '../repositories/IBackOrderRepository';

import ICreateBackOrderDTO from '../dtos/ICreateBackOrderDTO';

@injectable()
export default class CreateBackOrderService {
  constructor(
    @inject('IBackOrderRepository')
    private backOrderRepository: IBackOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    buy_box,
    estimate_profit,
    eta,
    note,
    product_id,
    supplier_id,
    unit_price,
    qtd,
  }: ICreateBackOrderDTO): Promise<BackOrder> {
    const shop = await this.backOrderRepository.create({
      buy_box,
      estimate_profit,
      eta,
      note,
      product_id,
      supplier_id,
      unit_price,
      qtd,
    });

    await this.cacheProvider.invalidatePrefix('all-backOrders-list');

    return shop;
  }
}
