"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateProducts1616260957503 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'products',
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
        name: 'sku',
        type: 'varchar'
      }, {
        name: 'asin',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'upc',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'note',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'image',
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
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('products');
  }

}

exports.default = CreateProducts1616260957503;