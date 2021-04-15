"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddBrandToProduct1618422164345 {
  async up(queryRunner) {
    await queryRunner.addColumn('products', new _typeorm.TableColumn({
      name: 'brand',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('products', 'brand');
  }

}

exports.default = AddBrandToProduct1618422164345;