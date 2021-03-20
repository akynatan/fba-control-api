import { getRepository, Repository } from 'typeorm';
import IShopsRepository from '@modules/shops/repositories/IShopsRepository';
import ICreateShopDTO from '@modules/shops/dtos/ICreateShopDTO';

import Shop from '../entities/Shop';

export default class ShopsRepository implements IShopsRepository {
  private ormRepository: Repository<Shop>;

  constructor() {
    this.ormRepository = getRepository(Shop);
  }

  public async findByName(name: string): Promise<Shop | undefined> {
    const shop = await this.ormRepository.findOne({
      where: { name },
    });

    return shop;
  }

  public async create(shopData: ICreateShopDTO): Promise<Shop> {
    const shop = this.ormRepository.create(shopData);
    await this.ormRepository.save(shop);
    return shop;
  }
}
