"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateProductSupplierOrder1619010714454 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'product_order',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'product_supplier_id',
        type: 'uuid'
      }, {
        name: 'order_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'unit_price',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'qtd',
        type: 'integer',
        isNullable: true,
        default: 1
      }, {
        name: 'label',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'prep',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'other_cost',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'buy_box',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'amazon_fee',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'note',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        default: 'now()'
      }],
      foreignKeys: [{
        name: 'OrderProductSupplier',
        referencedTableName: 'product_supplier',
        referencedColumnNames: ['id'],
        columnNames: ['product_supplier_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      }, {
        name: 'OrderProductSupplierOrder',
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        columnNames: ['order_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('product_order');
  }

}

exports.default = CreateProductSupplierOrder1619010714454;