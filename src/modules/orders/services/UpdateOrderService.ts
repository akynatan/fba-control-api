import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';
import IOrdersRepository from '../repositories/IOrdersRepository';

interface IRequest {
  order_id: string;
  supplier_id: string;
  form_payment: string;
  its_paid: boolean;
  status: string;
  date: Date;
  invoice: string;
  other_cost: number;
  shipment_cost: number;
}

@injectable()
export default class UpdateOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    order_id,
    supplier_id,
    date,
    invoice,
    other_cost,
    shipment_cost,
    form_payment,
    its_paid,
    status,
  }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    delete order.supplier;

    order.supplier_id = supplier_id;
    order.date = date;
    order.invoice = invoice;
    order.other_cost = other_cost;
    order.shipment_cost = shipment_cost;
    order.form_payment = form_payment;
    order.its_paid = its_paid;
    order.status = status;

    await this.ordersRepository.save(order);

    return order;
  }
}
