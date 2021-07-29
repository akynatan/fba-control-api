import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import BackOrder from '../infra/typeorm/entities/BackOrder';
import IBackOrderRepository from '../repositories/IBackOrderRepository';

interface IRequest {
  back_order_id: string;
  supplier_id: number;
  product_id: number;
  qtd: number;
  unit_price: number;
  eta: number;
  buy_box: number;
  estimate_profit: number;
  note: string;
}

@injectable()
export default class UpdateBackOrderService {
  constructor(
    @inject('BackOrderRepository')
    private backorderRepository: IBackOrderRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    back_order_id,
    buy_box,
    estimate_profit,
    eta,
    note,
    product_id,
    supplier_id,
    unit_price,
    qtd,
  }: IRequest): Promise<BackOrder> {
    const backorder = await this.backorderRepository.findByID(back_order_id);

    if (!backorder) {
      throw new AppError('BackOrder not found.');
    }

    backorder.buy_box = buy_box;
    backorder.estimate_profit = estimate_profit;
    backorder.eta = eta;
    backorder.note = note;
    backorder.product_id = product_id;
    backorder.supplier_id = supplier_id;
    backorder.unit_price = unit_price;
    backorder.qtd = qtd;

    await this.backorderRepository.save(backorder);

    // await this.cacheProvider.invalidate('backorder-list');

    return backorder;
  }
}
