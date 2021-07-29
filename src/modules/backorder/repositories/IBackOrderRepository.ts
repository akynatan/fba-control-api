import ICreateBackOrderDTO from '../dtos/ICreateBackOrderDTO';
import BackOrder from '../infra/typeorm/entities/BackOrder';

export default interface IBackOrderRepository {
  create(data: ICreateBackOrderDTO): Promise<BackOrder>;
  save(storage_fee: BackOrder): Promise<BackOrder>;
  findByID(id: string): Promise<BackOrder | undefined>;
  findByAmazonOrderId(amazon_order_id: string): Promise<BackOrder | undefined>;
  findAll(): Promise<BackOrder[]>;
  findByIds(ids: string[]): Promise<BackOrder[]>;
  delete(id: string): Promise<void>;
}
