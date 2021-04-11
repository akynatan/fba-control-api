/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

interface IRequest {
  id: string;
  tel: string;
  mail: string;
  domain: string;
  note: string;
}

@injectable()
export default class UpdateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    id,
    tel,
    mail,
    domain,
    note,
  }: IRequest): Promise<Supplier> {
    const supplier = await this.suppliersRepository.findByID(id);

    if (!supplier) {
      throw new AppError('Not found supplier');
    }

    supplier.tel = tel;
    supplier.mail = mail;
    supplier.domain = domain;
    supplier.note = note;

    this.suppliersRepository.save(supplier);

    // await this.cacheProvider.invalidate(`suppliers`);

    return supplier;
  }
}
