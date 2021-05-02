"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateItemsShipment1619374882316 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'item_shipment_order',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'shipment_order_id',
        type: 'uuid',
        isNullable: true
      }, {
        name: 'sku',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'qtd_shipped',
        type: 'integer',
        isNullable: true,
        default: 0
      }, {
        name: 'qtd_received',
        type: 'integer',
        isNullable: true,
        default: 0
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
        name: 'ItemShipmentOrder',
        referencedTableName: 'shipment_order',
        referencedColumnNames: ['id'],
        columnNames: ['shipment_order_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('item_shipment_order');
  }

}

exports.default = CreateItemsShipment1619374882316;