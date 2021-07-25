/* eslint-disable no-await-in-loop */
import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';

import IStorageFeeRepository from '../repositories/IStorageFeeRepository';
import ICreateStorageFeeDTO from '../dtos/ICreateStorageFeeDTO';

@injectable()
export default class DownloadReportStorageFeeInAmazonService {
  constructor(
    @inject('StorageFeeRepository')
    private storageFeeRepository: IStorageFeeRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,

    @inject('ReportAmazonRepository')
    private reportAmazonRepository: IReportAmazonRepository,
  ) {}

  public async execute(report_id_storages: string[]): Promise<any> {
    console.log('começou');
    for (let i = 0; i < report_id_storages.length; i += 1) {
      const report_id = report_id_storages[i];

      const {
        processingStatus,
        reportDocumentId,
      } = await this.amazonSellerProvider.getStatusReport(report_id);

      if (processingStatus === 'DONE') {
        const storage_fee_json_amazon: ICreateStorageFeeDTO[] = await this.amazonSellerProvider.downloadReport(
          reportDocumentId,
        );

        for (let j = 0; j < storage_fee_json_amazon.length; j += 1) {
          const storage_fee = storage_fee_json_amazon[j];

          await this.storageFeeRepository.create(storage_fee);
        }

        await this.reportAmazonRepository.checkDownloadedEqualTrue(report_id);
      }
    }
  }
}
