"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateOrders1619010229640 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'orders',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'date',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'supplier_id',
        type: 'uuid'
      }, {
        name: 'form_payment',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'its_paid',
        type: 'boolean',
        default: false
      }, {
        name: 'status',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'shipment_cost',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'other_cost',
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
        name: 'OrderSupplier',
        referencedTableName: 'suppliers',
        referencedColumnNames: ['id'],
        columnNames: ['supplier_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('orders');
  }

}

exports.default = CreateOrders1619010229640;