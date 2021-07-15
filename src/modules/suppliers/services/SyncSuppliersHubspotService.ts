/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import * as hubspot from '@hubspot/api-client';
import { isAfter, addHours } from 'date-fns';
// import { Filter } from '@hubspot/api-client/lib/codegen/crm/companies/model/filter.d';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ILogRoutineRepository from '@modules/routines/repositories/ILogRoutineRepository';
import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

import ISuppliersRepository from '../repositories/ISuppliersRepository';

@injectable()
export default class SyncSuppliersHubspotService {
  constructor(
    @inject('SuppliersRepository')
    private suppliersRepository: ISuppliersRepository,

    @inject('LogRoutineRepository')
    private logRoutineRepository: ILogRoutineRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute(): Promise<Supplier[]> {
    console.log('iniciou');
    const hubspotClient = new hubspot.Client({
      apiKey: process.env.API_KEY_HUBSPOT,
    });

    // const allSuppliers = await hubspotClient.crm.companies.searchApi.doSearch({
    //   after: 0,
    //   limit: 100,
    //   properties: ['domain', 'name', 'hs_lead_status'],
    //   sorts: [
    //     JSON.stringify({ propertyName: 'createdate', direction: 'DESCENDING' },
    //   ],
    //   filterGroups: [
    //     {
    //       filters: [
    //         {
    //           propertyName: 'hs_lead_status',
    //           operator: 'EQ',
    //           value: 'ARCHIVED',
    //         },
    //       ],
    //     },
    //   ],
    // });
    // return allSuppliers;

    const lastLogRoutine = await this.logRoutineRepository.lastSyncByNameRoutine(
      'hubspot_supplier',
    );

    let lastSincronized = new Date('2021-01-01T21:36:37.105Z');

    if (lastLogRoutine) {
      lastSincronized = new Date(lastLogRoutine.created_at);
    }

    const allSuppliers = await hubspotClient.crm.companies.getAll(
      undefined,
      undefined,
      ['hs_lead_status', 'name', 'domain'],
    );

    const suppliersInserted = allSuppliers.filter(supplier => {
      return ['Won - In Analysis', 'CONNECTED', 'Won - In Analysis'].includes(
        supplier.properties.hs_lead_status,
      );
    });

    const newSuppliers = suppliersInserted.filter(supplier => {
      const dateUtc = addHours(
        new Date(supplier.properties.hs_lastmodifieddate),
        3,
      );

      return isAfter(dateUtc, lastSincronized);
    });

    const suppliers = newSuppliers.map(async supplier => {
      const {
        domain,
        name,
        hs_object_id,
        hs_lastmodifieddate,
        hs_lead_status,
        createdate,
      } = supplier.properties;

      const id_hubspot = Number(hs_object_id);

      const supplier_inserted = await this.suppliersRepository.findByIDHubspot(
        id_hubspot,
      );

      if (!supplier_inserted) {
        const supplierInsered = await this.suppliersRepository.create({
          name,
          domain,
          id_hubspot,
          status_hubspot: hs_lead_status,
          created_at_hubspot: createdate,
          updated_at_hubspot: hs_lastmodifieddate,
        });
        return supplierInsered;
      }

      supplier_inserted.name = name;
      supplier_inserted.domain = domain;
      supplier_inserted.status_hubspot = hs_lead_status;
      supplier_inserted.created_at_hubspot = new Date(createdate);
      supplier_inserted.updated_at_hubspot = new Date(hs_lastmodifieddate);
      supplier_inserted.id_hubspot = id_hubspot;

      await this.suppliersRepository.save(supplier_inserted);

      return supplier_inserted;
    });

    await this.logRoutineRepository.create({
      name_routine: 'hubspot_supplier',
    });

    console.log('finalizou');
    return Promise.all(suppliers);
  }
}
