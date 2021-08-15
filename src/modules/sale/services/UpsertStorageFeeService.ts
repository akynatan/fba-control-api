/* eslint-disable no-param-reassign */
/* eslint-disable camelcase */
import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IItemsByShipment from '@shared/container/providers/AmazonProvider/dtos/IItemsByShipment';
import IParamsGetAlYlShipments from '@shared/container/providers/AmazonProvider/dtos/IParamsGetAllShipments';
import ShipmentOrder from '../infra/typeorm/entities/Sale';
import IStorageFeeRepository from '../repositories/ISaleRepository';


@injectable()
export default class UpsertStorageFeeService {
  constructor(
    @inject('StorageFeeRepository')
    private storageFeeRepository: IStorageFeeRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute(): Promise<any> {
    const all_reports = await this.amazonSellerProvider.getReportSchedulesByReportType(
      'GET_FBA_STORAGE_FEE_CHARGES_DATA',
    );

    const report = all_reports.find(
      report => report.processingStatus === 'DONE',
    );

    if(report) {

    }

  }
