import ICreateStorageFeeDTO from '../dtos/ICreateStorageFeeDTO';
import StorageFee from '../infra/typeorm/entities/StorageFee';

export default interface IStorageFeeRepository {
  create(data: ICreateStorageFeeDTO): Promise<StorageFee>;
  save(storage_fee: StorageFee): Promise<StorageFee>;
  findByID(id: string): Promise<StorageFee | undefined>;
  findAll(): Promise<StorageFee[]>;
}
