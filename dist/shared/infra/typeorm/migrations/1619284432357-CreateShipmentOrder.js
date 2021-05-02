"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateShipmentOrder1619284432357 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'shipment_order',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'order_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'shipment_id',
        type: 'varchar'
      }, {
        name: 'cost',
        type: 'real',
        isNullable: true,
        default: 0
      }, {
        name: 'status',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'items',
        type: 'varchar',
        isNullable: true
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
    await queryRunner.dropTable('shipment_order');
  }

}

exports.default = CreateShipmentOrder1619284432357;