"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateSuppliers1615657125158 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'suppliers',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'note',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'id_hubspot',
        type: 'bigint',
        isNullable: true
      }, {
        name: 'tel',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'mail',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'status_hubspot',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'domain',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'created_at_hubspot',
        type: 'timestamp',
        isNullable: true
      }, {
        name: 'updated_at_hubspot',
        type: 'timestamp',
        isNullable: true
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
  }

  async down(queryRunner) {
    await queryRunner.dropTable('suppliers');
  }

}

exports.default = CreateSuppliers1615657125158;