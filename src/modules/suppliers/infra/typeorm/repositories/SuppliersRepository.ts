import { getRepository, Repository, In } from 'typeorm';

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

  public async findByID(id: string): Promise<Supplier | undefined> {
    const supplier = this.ormRepository.findOne(id);
    return supplier;
  }

  public async findByIDHubspot(
    id_hubspot: string,
  ): Promise<Supplier | undefined> {
    const supplier = this.ormRepository.findOne({
      where: {
        id_hubspot,
      },
    });

    return supplier;
  }

  public async save(supplier: Supplier): Promise<Supplier> {
    await this.ormRepository.save(supplier);
    return supplier;
  }
}
