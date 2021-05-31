import { getRepository, In, Repository } from 'typeorm';
import IShipmentOrdersRepository from '@modules/orders/repositories/IShipmentOrdersRepository';

import AppError from '@shared/errors/AppError';
import ICreateShipmentOrderDTO from '@modules/orders/dtos/ICreateShipmentOrderDTO';
import ShipmentOrder from '../entities/ShipmentOrder';

export default class ShipmentOrdersRepository
  implements IShipmentOrdersRepository {
  private ormRepository: Repository<ShipmentOrder>;

  constructor() {
    this.ormRepository = getRepository(ShipmentOrder);
  }

  public async save(order: ShipmentOrder): Promise<ShipmentOrder> {
    await this.ormRepository.save(order);
    return order;
  }

  public async create(
    shipment_order_data: ICreateShipmentOrderDTO,
  ): Promise<ShipmentOrder> {
    const shipment_order = this.ormRepository.create(shipment_order_data);
    await this.ormRepository.save(shipment_order);
    return shipment_order;
  }

  public async findAll(): Promise<ShipmentOrder[]> {
    const shipment_order = await this.ormRepository.find({
      relations: ['order'],
    });
    return shipment_order;
  }

  public async findByID(id: string): Promise<ShipmentOrder | undefined> {
    const shipment_order = await this.ormRepository.findOne(id, {
      relations: ['order'],
    });
    return shipment_order;
  }

  public async findByOrder(order_id: string): Promise<ShipmentOrder[]> {
    const shipment_order = await this.ormRepository.find({
      where: {
        order_id,
      },
      relations: ['items_shipment'],
    });
    return shipment_order;
  }

  public async findByOrders(orders: string[]): Promise<ShipmentOrder[]> {
    const shipment_order = await this.ormRepository.find({
      where: {
        order_id: In(orders),
      },
      relations: ['items_shipment', 'order', 'order.supplier'],
    });
    return shipment_order;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete(id);
    } catch (err) {
      throw new AppError('Erro');
    }
  }
}
