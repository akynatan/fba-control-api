import { getRepository, Repository } from 'typeorm';
import IReportAmazonRepository from '@modules/report_amazon/repositories/IReportAmazonRepository';
import ICreateReportsAmazonDTO from '@modules/report_amazon/dtos/ICreateReportsAmazonDTO';

import ReportAmazon from '../entities/ReportAmazon';

export default class ReportAmazonRepository implements IReportAmazonRepository {
  private ormRepository: Repository<ReportAmazon>;

  constructor() {
    this.ormRepository = getRepository(ReportAmazon);
  }

  public async findAllToDownload(): Promise<ReportAmazon[]> {
    const reports = await this.ormRepository.find({
      where: { downloaded: false },
    });

    return reports;
  }

  public async create(
    reportData: ICreateReportsAmazonDTO,
  ): Promise<ReportAmazon> {
    const report = this.ormRepository.create(reportData);
    await this.ormRepository.save(report);
    return report;
  }

  public async save(report: ReportAmazon): Promise<ReportAmazon> {
    await this.ormRepository.save(report);
    return report;
  }

  public async findByReportId(
    report_id: string,
  ): Promise<ReportAmazon | undefined> {
    const report = await this.ormRepository.findOne({
      where: { report_id },
    });
    return report;
  }

  public async checkDownloadedEqualTrue(report_id: string): Promise<void> {
    const report = await this.ormRepository.findOne({
      where: { report_id },
    });

    if (report) {
      report.downloaded = true;
      await this.ormRepository.save(report);
    }
  }
}
