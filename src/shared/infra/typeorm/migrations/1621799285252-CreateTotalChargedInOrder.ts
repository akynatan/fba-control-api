import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateTotalChargedInOrder1621799285252
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'total_charged',
        type: 'real',
        isNullable: true,
        default: 0,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'total_charged');
  }
}
