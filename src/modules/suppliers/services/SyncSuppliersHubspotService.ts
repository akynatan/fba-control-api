/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import * as hubspot from '@hubspot/api-client';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import Supplier from '../infra/typeorm/entities/Supplier';
import ISuppliersRepository from '../repositories/ISuppliersRepository';

@injectable()
export default class CreateSupplierService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Supplier[]> {
    const hubspotClient = new hubspot.Client({
      apiKey: '45ea5af3-2025-4f67-a8d4-2ea3fa6cd8bb',
    });

    // const allCompanies = await hubspotClient.crm.companies.searchApi.doSearch({
    //   after: 0,
    //   limit: 100,
    //   properties: ['createdate'],
    //   sorts: [
    //     JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' }),
    //   ],
    //   filterGroups: [
    //     { filters: [{ propertyName: 'createdate', operator:  }] },
    //   ],
    // });

    const allSuppliers = await hubspotClient.crm.companies.getAll(
      100,
      '5604839009',
    );

    const suppliers = allSuppliers.map(async supplier => {
      const { domain, name, hs_object_id } = supplier.properties;
      const id_hubspot = Number(hs_object_id);

      if (name !== null && domain !== null) {
        const supplierInsered = await this.suppliersRepository.create({
          name,
          domain,
          id_hubspot,
        });

        return supplierInsered;
      }
      return {} as Supplier;
    });

    return Promise.all(suppliers);
  }
}
