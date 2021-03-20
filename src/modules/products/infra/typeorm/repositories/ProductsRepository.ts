import { getRepository, Repository } from 'typeorm';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ICreateProductDTO from '@modules/products/dtos/ICreateProductDTO';

import Product from '../entities/Product';

export default class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);
    return product;
  }

  public async create(
    productData: Omit<ICreateProductDTO, 'suppliers'>,
  ): Promise<Product> {
    const product = this.ormRepository.create(productData);
    await this.ormRepository.save(product);
    return product;
  }

  public async findAll(): Promise<Product[]> {
    const users = await this.ormRepository.find();
    return users;
  }

  public async findByID(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);
    return product;
  }
}
