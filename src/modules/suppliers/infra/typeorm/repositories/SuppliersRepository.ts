import { getRepository, Repository } from 'typeorm';

import ISuppliersRepository from '@modules/suppliers/repositories/ISuppliersRepository';
import ICreateSupplierDTO from '@modules/suppliers/dtos/ICreateSupplierDTO';

import Supplier from '../entities/Supplier';

export default class SuppliersRepository implements ISuppliersRepository {
  private ormRepository: Repository<Supplier>;

  constructor() {
    this.ormRepository = getRepository(Supplier);
  }

  public async create({
    name,
    note,
    tel,
    mail,
    domain,
    id_hubspot,
  }: ICreateSupplierDTO): Promise<Supplier> {
    const supplier = this.ormRepository.create({
      name,
      note,
      tel,
      mail,
      domain,
      id_hubspot,
    });

    await this.ormRepository.save(supplier);
    return supplier;
  }

  public async findAll(): Promise<Supplier[]> {
    const suppliers = this.ormRepository.find();
    return suppliers;
  }
}
