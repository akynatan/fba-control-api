import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFilesOrder1619097969688
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files_orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'name_file',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'name_file_original',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'OrderProductSupplierOrder',
            referencedTableName: 'orders',
            referencedColumnNames: ['id'],
            columnNames: ['order_id'],
            onDelete: 'RESTRICT',
            onUpdate: 'RESTRICT',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files_orders');
  }
}
