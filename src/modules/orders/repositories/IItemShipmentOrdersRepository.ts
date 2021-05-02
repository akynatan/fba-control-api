import ICreateItemShipmentOrderDTO from '../dtos/ICreateItemShipmentOrderDTO';
import ItemShipmentOrder from '../infra/typeorm/entities/ItemShipmentOrder';

export default interface IItemShipmentOrdersRepository {
  create(data: ICreateItemShipmentOrderDTO): Promise<ItemShipmentOrder>;
  save(shipment_order: ItemShipmentOrder): Promise<ItemShipmentOrder>;
  findByID(id: string): Promise<ItemShipmentOrder | undefined>;
  deleteByShipmentID(shipment_id: string): Promise<boolean>;
}
