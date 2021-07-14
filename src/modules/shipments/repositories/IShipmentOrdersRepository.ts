import ICreateShipmentOrderDTO from '../dtos/ICreateShipmentOrderDTO';
import ShipmentOrder from '../infra/typeorm/entities/ShipmentOrder';

export default interface IShipmentOrdersRepository {
  create(data: ICreateShipmentOrderDTO): Promise<ShipmentOrder>;
  save(shipment_order: ShipmentOrder): Promise<ShipmentOrder>;
  findByID(id: string): Promise<ShipmentOrder | undefined>;
  findByOrder(order_id: string): Promise<ShipmentOrder[]>;
  findByShipmentId(shipment_id: string): Promise<ShipmentOrder[]>;
  findByOrders(orders: string[]): Promise<ShipmentOrder[]>;
  findAll(): Promise<ShipmentOrder[]>;
  delete(id: string): Promise<void>;
}
