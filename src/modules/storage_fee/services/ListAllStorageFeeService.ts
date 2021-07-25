/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import IStorageFeeRepository from '../repositories/IStorageFeeRepository';
import StorageFee from '../infra/typeorm/entities/StorageFee';

@injectable()
export default class ListAllStorageFeeService {
  constructor(
    @inject('StorageFeeRepository')
    private storageFeeRepository: IStorageFeeRepository,
  ) {}

  public async execute(): Promise<StorageFee[]> {
    const storages = await this.storageFeeRepository.findAll();

    return storages;
  }
}
