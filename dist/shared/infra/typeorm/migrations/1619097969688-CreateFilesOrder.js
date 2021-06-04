"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateFilesOrder1619097969688 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'files_orders',
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
        name: 'name_file',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'name_file_original',
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
    await queryRunner.dropTable('files_orders');
  }

}

exports.default = CreateFilesOrder1619097969688;