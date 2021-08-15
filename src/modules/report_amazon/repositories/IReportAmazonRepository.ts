import ICreateReportsAmazonDTO from '../dtos/ICreateReportsAmazonDTO';
import ReportAmazon from '../infra/typeorm/entities/ReportAmazon';

export default interface IReportAmazonRepository {
  create(reportData: ICreateReportsAmazonDTO): Promise<ReportAmazon>;
  findAllToDownload(): Promise<ReportAmazon[]>;
  save(report: ReportAmazon): Promise<ReportAmazon>;
  findByReportId(report_id: string): Promise<ReportAmazon | undefined>;
  checkDownloadedEqualTrue(report_id: string): Promise<void>;
}
