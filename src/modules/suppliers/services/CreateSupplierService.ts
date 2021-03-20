/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

interface IRequest {
  name: string;
  note?: string;
  tel?: string;
  mail?: string;
  domain: string;
  id_hubspot?: number;
}

@injectable()
export default class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    name,
    note,
    tel,
    mail,
    domain,
    id_hubspot,
  }: IRequest): Promise<Supplier> {
    const supplier = await this.suppliersRepository.create({
      name,
      note,
      tel,
      mail,
      domain,
      id_hubspot,
    });

    await this.cacheProvider.invalidate(`suppliers`);

    return supplier;
  }
}
