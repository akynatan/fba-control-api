"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateShop1616246652815 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: 'shops',
      columns: [{
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        generationStrategy: 'uuid',
        default: 'uuid_generate_v4()'
      }, {
        name: 'name',
        type: 'varchar'
      }, {
        name: 'token_hubspot',
        type: 'varchar'
      }, {
        name: 'token_amazon',
        type: 'varchar'
      }, {
        name: 'avatar',
        type: 'varchar',
        isNullable: true
      }, {
        name: 'created_at',
        type: 'timestamp',
        isUnique: true,
        default: 'now()'
      }, {
        name: 'updated_at',
        type: 'timestamp',
        isUnique: true,
        default: 'now()'
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable('shops');
  }

}

exports.default = CreateShop1616246652815;