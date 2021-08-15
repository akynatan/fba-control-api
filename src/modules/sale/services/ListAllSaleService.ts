/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import ISaleRepository from '../repositories/ISaleRepository';
import Sale from '../infra/typeorm/entities/Sale';

@injectable()
export default class ListAllSaleService {
  constructor(
    @inject('SaleRepository')
    private storageFeeRepository: ISaleRepository,
  ) {}

  public async execute(): Promise<Sale[]> {
    const sales = await this.storageFeeRepository.findAll();

    return sales;
  }
}
