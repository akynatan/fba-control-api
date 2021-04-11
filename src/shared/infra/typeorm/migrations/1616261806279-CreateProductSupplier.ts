import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class CreateProductSupplier1616261806279
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_supplier',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'product_id',
            type: 'uuid',
          },
          {
            name: 'supplier_id',
            type: 'uuid',
          },
          {
            name: 'note',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sku_supplier',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'restriction_to_buy',
            type: 'boolean',
            isNullable: true,
            default: false,
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

    await queryRunner.createForeignKey(
      'product_supplier',
      new TableForeignKey({
        name: 'ProductProductSupplier',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'product_supplier',
      new TableForeignKey({
        name: 'SupplierProductSupplier',
        columnNames: ['supplier_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'suppliers',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'product_supplier',
      'SupplierProductSupplier',
    );
    await queryRunner.dropForeignKey(
      'product_supplier',
      'ProductProductSupplier',
    );
    await queryRunner.dropTable('product_supplier');
  }
}
