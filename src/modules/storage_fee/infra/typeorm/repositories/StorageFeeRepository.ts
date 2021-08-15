import { getRepository, Repository } from 'typeorm';
import IStorageFeeRepository from '@modules/storage_fee/repositories/IStorageFeeRepository';

import ICreateStorageFeeDTO from '@modules/storage_fee/dtos/ICreateStorageFeeDTO';
import StorageFee from '../entities/StorageFee';

export default class StorageFeeRepository implements IStorageFeeRepository {
  private ormRepository: Repository<StorageFee>;

  constructor() {
    this.ormRepository = getRepository(StorageFee);
  }

  public async save(storage_fee: StorageFee): Promise<StorageFee> {
    await this.ormRepository.save(storage_fee);
    return storage_fee;
  }

  public async create(
    storage_fee_data: ICreateStorageFeeDTO,
  ): Promise<StorageFee> {
    const storage_fee = this.ormRepository.create(storage_fee_data);
    await this.ormRepository.save(storage_fee);
    return storage_fee;
  }

  public async findByID(id: string): Promise<StorageFee | undefined> {
    const storage_fee = await this.ormRepository.findOne(id);
    return storage_fee;
  }

  public async findAll(): Promise<StorageFee[]> {
    const storages = await this.ormRepository.find();

    return storages;
  }
}
