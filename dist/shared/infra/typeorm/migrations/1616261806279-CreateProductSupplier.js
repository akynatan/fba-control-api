"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateProductSupplier1616261806279 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'product_supplier',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'product_id',
        type: 'uuid'
      }, {
        name: 'supplier_id',
        type: 'uuid'
      }, {
        name: 'note',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'sku_supplier',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'restriction_to_buy',
        type: 'boolean',
        isNullable: true,
        default: false
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }]
    }));
    await queryRunner.createForeignKey('product_supplier', new _typeorm.TableForeignKey({
      name: 'ProductProductSupplier',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('product_supplier', new _typeorm.TableForeignKey({
      name: 'SupplierProductSupplier',
      columnNames: ['supplier_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'suppliers',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('product_supplier', 'SupplierProductSupplier');
    await queryRunner.dropForeignKey('product_supplier', 'ProductProductSupplier');
    await queryRunner.dropTable('product_supplier');
  }

}

exports.default = CreateProductSupplier1616261806279;