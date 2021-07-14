import { getRepository, Repository } from 'typeorm';
import IItemShipmentOrdersRepository from '@modules/orders/repositories/IItemShipmentOrdersRepository';

import ICreateItemShipmentOrderDTO from '@modules/shipments/dtos/ICreateItemShipmentOrderDTO';
import ItemShipmentOrder from '../entities/ItemShipmentOrder';

export default class ItemShipmentOrdersRepository
  implements IItemShipmentOrdersRepository {
  private ormRepository: Repository<ItemShipmentOrder>;

  constructor() {
    this.ormRepository = getRepository(ItemShipmentOrder);
  }

  public async save(order: ItemShipmentOrder): Promise<ItemShipmentOrder> {
    await this.ormRepository.save(order);
    return order;
  }

  public async create(
    shipment_order_data: ICreateItemShipmentOrderDTO,
  ): Promise<ItemShipmentOrder> {
    const shipment_order = this.ormRepository.create(shipment_order_data);
    await this.ormRepository.save(shipment_order);
    return shipment_order;
  }

  public async findByID(id: string): Promise<ItemShipmentOrder | undefined> {
    const shipment_order = await this.ormRepository.findOne(id, {
      relations: ['order'],
    });
    return shipment_order;
  }

  public async deleteByShipmentID(shipment_id: string): Promise<boolean> {
    try {
      await this.ormRepository.delete({
        shipment_order_id: shipment_id,
      });
      return true;
    } catch {
      return false;
    }
  }
}
