import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddColumnInboundAndAvailableInProduct1626388558888
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('products', [
      new TableColumn({
        name: 'available',
        type: 'real',
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: 'inbound',
        type: 'real',
        isNullable: true,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'inbound');
    await queryRunner.dropColumn('users', 'available');
  }
}
