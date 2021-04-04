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

    const allSuppliers = await hubspotClient.crm.companies.searchApi.doSearch({
      after: 0,
      limit: 100,
      properties: [
        'city',
        'description',
        'industry',
        'about_us',
        'phone',
        'zip',
        'state',
        'region',
        'is_public',
        'country',
      ],
      sorts: [
        JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' }),
      ],
      filterGroups: [
        {
          filters: [
            // { propertyName: 'createdate', operator: 'NOT_HAS_PROPERTY' },
            // {
            //   propertyName: 'archived',
            //   operator: 'EQ',
            //   value: 'false',
            // },
            // {
            //   propertyName: 'createdAt',
            //   operator: 'GTE',
            //   value: '2019-02-16T00:26:30.710Z',
            // },
          ],
        },
      ],
    });

    // const allSuppliers = await hubspotClient.crm.companies.getAll(
    //   100,
    //   '5604839009',
    // );

    console.log(allSuppliers);

    // const suppliers = allSuppliers.map(async supplier => {
    //   const { domain, name, hs_object_id } = supplier.properties;
    //   const id_hubspot = Number(hs_object_id);

    //   if (name !== null && domain !== null) {
    //     const supplierInsered = await this.suppliersRepository.create({
    //       name,
    //       domain,
    //       id_hubspot,
    //     });

    //     return supplierInsered;
    //   }
    //   return {} as Supplier;
    // });

    return allSuppliers;
    // return Promise.all(suppliers);
  }
}
