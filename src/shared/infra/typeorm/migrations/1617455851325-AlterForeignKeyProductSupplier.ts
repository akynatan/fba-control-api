import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class AlterForeignKeyProductSupplier1617455851325
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'product_supplier',
      'SupplierProductSupplier',
    );

    await queryRunner.dropForeignKey(
      'product_supplier',
      'ProductProductSupplier',
    );

    await queryRunner.createForeignKey(
      'product_supplier',
      new TableForeignKey({
        name: 'ProductProductSupplier',
        columnNames: ['product_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'RESTRICT',
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
        onDelete: 'RESTRICT',
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
  }
}
