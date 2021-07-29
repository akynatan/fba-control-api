import { getRepository, Repository } from 'typeorm';
import ISaleRepository from '@modules/sale/repositories/ISaleRepository';

import ICreateSaleDTO from '@modules/sale/dtos/ICreateSaleDTO';
import Sale from '../entities/Sale';

export default class SaleRepository implements ISaleRepository {
  private ormRepository: Repository<Sale>;

  constructor() {
    this.ormRepository = getRepository(Sale);
  }

  public async save(sale: Sale): Promise<Sale> {
    await this.ormRepository.save(sale);
    return sale;
  }

  public async create(sale_data: ICreateSaleDTO): Promise<Sale> {
    const sale = this.ormRepository.create(sale_data);
    await this.ormRepository.save(sale);
    return sale;
  }

  public async findByID(id: string): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne(id);
    return sale;
  }

  public async findByAmazonOrderId(
    amazon_order_id: string,
  ): Promise<Sale | undefined> {
    const sale = await this.ormRepository.findOne({
      where: {
        amazon_order_id,
      },
    });
    return sale;
  }

  public async findAll(): Promise<Sale[]> {
    const storages = await this.ormRepository.find();

    return storages;
  }
}
