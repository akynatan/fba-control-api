import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateSubTotalInOrder1621790709506
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'sub_total',
        type: 'real',
        isNullable: true,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'sub_total');
  }
}
