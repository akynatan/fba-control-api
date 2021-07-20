import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnReportDocumentIdInReportAmazon1626654931778
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('report_amazon', [
      new TableColumn({
        name: 'report_document_id',
        type: 'varchar',
        isNullable: true,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('report_amazon', 'report_document_id');
  }
}
