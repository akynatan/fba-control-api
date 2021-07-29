import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBackOrder1627594889604
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'backorder',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_supplier',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qtd',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qtd',
            type: 'integer',
            isNullable: true,
            default: 1,
          },
          {
            name: 'price',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'eta',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'by_box',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'estimate_profit',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'note',
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('backorder');
  }
}
