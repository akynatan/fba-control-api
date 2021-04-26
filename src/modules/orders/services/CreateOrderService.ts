import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IOrdersRepository from '../repositories/IOrdersRepository';

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    date,
    supplier_id,
    form_payment,
    its_paid,
    shipment_cost,
    other_cost,
    note,
    status,
  }: ICreateOrderDTO): Promise<Order> {
    const order = await this.ordersRepository.create({
      date,
      supplier_id,
      form_payment,
      shipment_cost,
      other_cost,
      its_paid,
      note,
      status,
    });

    // await this.cacheProvider.invalidate('products-list');

    return order;
  }
}
