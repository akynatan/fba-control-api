"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AlterForeignKeyProductSupplier1617455851325 {
  async up(queryRunner) {
    await queryRunner.dropForeignKey('product_supplier', 'SupplierProductSupplier');
    await queryRunner.dropForeignKey('product_supplier', 'ProductProductSupplier');
    await queryRunner.createForeignKey('product_supplier', new _typeorm.TableForeignKey({
      name: 'ProductProductSupplier',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('product_supplier', new _typeorm.TableForeignKey({
      name: 'SupplierProductSupplier',
      columnNames: ['supplier_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'suppliers',
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('product_supplier', 'SupplierProductSupplier');
    await queryRunner.dropForeignKey('product_supplier', 'ProductProductSupplier');
    await queryRunner.createForeignKey('product_supplier', new _typeorm.TableForeignKey({
      name: 'SupplierProductSupplier',
      columnNames: ['supplier_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'suppliers',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
    await queryRunner.createForeignKey('product_supplier', new _typeorm.TableForeignKey({
      name: 'ProductProductSupplier',
      columnNames: ['product_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'products',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

}

exports.default = AlterForeignKeyProductSupplier1617455851325;