import ICreateSaleDTO from '../dtos/ICreateSaleDTO';
import Sale from '../infra/typeorm/entities/Sale';

export default interface ISaleRepository {
  create(data: ICreateSaleDTO): Promise<Sale>;
  save(storage_fee: Sale): Promise<Sale>;
  findByID(id: string): Promise<Sale | undefined>;
  findByAmazonOrderId(amazon_order_id: string): Promise<Sale | undefined>;
  findAll(): Promise<Sale[]>;
}
