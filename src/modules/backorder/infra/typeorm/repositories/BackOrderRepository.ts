import { getRepository, In, Repository } from 'typeorm';
import IBackOrderRepository from '@modules/backorder/repositories/IBackOrderRepository';

import ICreateBackOrderDTO from '@modules/backorder/dtos/ICreateBackOrderDTO';
import AppError from '@shared/errors/AppError';
import BackOrder from '../entities/BackOrder';

export default class BackOrderRepository implements IBackOrderRepository {
  private ormRepository: Repository<BackOrder>;

  constructor() {
    this.ormRepository = getRepository(BackOrder);
  }

  public async save(backorder: BackOrder): Promise<BackOrder> {
    await this.ormRepository.save(backorder);
    return backorder;
  }

  public async create(backorder_data: ICreateBackOrderDTO): Promise<BackOrder> {
    const backorder = this.ormRepository.create(backorder_data);
    await this.ormRepository.save(backorder);
    return backorder;
  }

  public async findByID(id: string): Promise<BackOrder | undefined> {
    const backorder = await this.ormRepository.findOne(id);
    return backorder;
  }

  public async findByAmazonOrderId(
    amazon_order_id: string,
  ): Promise<BackOrder | undefined> {
    const backorder = await this.ormRepository.findOne({
      where: {
        amazon_order_id,
      },
    });
    return backorder;
  }

  public async findAll(): Promise<BackOrder[]> {
    const storages = await this.ormRepository.find();

    return storages;
  }

  public async delete(id: string): Promise<void> {
    try {
      await await this.ormRepository.delete({
        id,
      });
    } catch (err) {
      console.log(err);
      throw new AppError('Erro');
    }
  }

  public async findByIds(ids: string[]): Promise<BackOrder[]> {
    const storages = await this.ormRepository.find({
      where: {
        id: In(ids),
      },
    });

    return storages;
  }
}
