import ICreateShopDTO from '../dtos/ICreateShopDTO';
import Shop from '../infra/typeorm/entities/Shop';

export default interface IShopsRepository {
  create(data: ICreateShopDTO): Promise<Shop>;
  findByName(name: string): Promise<Shop | undefined>;
}
