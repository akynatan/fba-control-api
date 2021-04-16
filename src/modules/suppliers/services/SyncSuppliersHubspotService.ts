/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';
import * as hubspot from '@hubspot/api-client';
import path from 'path';
import { isAfter } from 'date-fns';
// import { Filter } from '@hubspot/api-client/lib/codegen/crm/companies/model/filter.d';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import fs from 'fs';
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

    const lastSincronizedSupplierHubspot = JSON.parse(
      fs.readFileSync(
        path.resolve(
          `${__dirname}/../utils/lastSincronizedSupplierHubspot.json`,
        ),
        'utf8',
      ),
    );

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

    const newSuppliers = suppliersInserted.filter(supplier =>
      isAfter(
        new Date(supplier.properties.hs_lastmodifieddate),
        new Date(lastSincronizedSupplierHubspot.date),
      ),
    );

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

    lastSincronizedSupplierHubspot.date = new Date();

    fs.writeFileSync(
      path.resolve(`${__dirname}/../utils/lastSincronizedSupplierHubspot.json`),
      JSON.stringify(lastSincronizedSupplierHubspot),
    );

    return Promise.all(suppliers);
  }
}
