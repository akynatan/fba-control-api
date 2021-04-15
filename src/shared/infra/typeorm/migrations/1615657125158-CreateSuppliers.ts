import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSuppliers1615657125158
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'suppliers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'id_hubspot',
            type: 'bigint',
            isNullable: true,
          },
          {
            name: 'tel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'mail',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status_hubspot',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'domain',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at_hubspot',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at_hubspot',
            type: 'timestamp',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('suppliers');
  }
}
