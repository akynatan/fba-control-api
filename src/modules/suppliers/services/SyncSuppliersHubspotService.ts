/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import * as hubspot from '@hubspot/api-client';
// import { Filter } from '@hubspot/api-client/lib/codegen/crm/companies/model/filter.d';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { Equal } from 'typeorm';
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

  public async execute(): Promise<any> {
    const hubspotClient = new hubspot.Client({
      apiKey: process.env.API_KEY_HUBSPOT,
    });

    // const allSuppliers = await hubspotClient.crm.companies.searchApi.doSearch({
    //   after: 0,
    //   limit: 100,
    //   properties: [
    //     'city',
    //     'description',
    //     'industry',
    //     'about_us',
    //     'phone',
    //     'zip',
    //     'state',
    //     'region',
    //     'is_public',
    //     'country',
    //     'name',
    //     'hs_lead_status',
    //   ],
    //   sorts: [
    //     JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' }),
    //   ],
    //   filterGroups: [
    //     {
    //       filters: [
    //         // {
    //         //   propertyName: 'hs_lead_status',
    //         //   operator: 'EQ',
    //         //   value: 'won ina analysis',
    //         // },
    //       ],
    //     },
    //   ],
    // });

    const allSuppliers2 = await hubspotClient.crm.companies.getAll(
      undefined,
      undefined,
      ['hs_lead_status', 'name', 'domain'],
    );
    console.log(allSuppliers2);

    console.log(allSuppliers2);

    const suppliers = allSuppliers2.map(async supplier => {
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

    // return allSuppliers;
    return Promise.all(suppliers);
  }
}
