import { getRepository, Repository } from 'typeorm';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';
import ICreateProductSupplierDTO from '@modules/products/dtos/ICreateProductSupplierDTO';

import ProductSupplier from '../entities/ProductSupplier';

export default class ProductSupplierRepository
  implements IProductSupplierRepository {
  private ormRepository: Repository<ProductSupplier>;

  constructor() {
    this.ormRepository = getRepository(ProductSupplier);
  }

  public async create(
    productSupplierData: ICreateProductSupplierDTO,
  ): Promise<ProductSupplier> {
    const productSupplier = this.ormRepository.create(productSupplierData);
    await this.ormRepository.save(productSupplier);
    return productSupplier;
  }
}
