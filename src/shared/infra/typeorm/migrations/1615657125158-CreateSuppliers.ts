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
            name: 'domain',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            isUnique: true,
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            isUnique: true,
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
