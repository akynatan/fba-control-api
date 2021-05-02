"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class AddShopIdToUsers1616249957129 {
  async up(queryRunner) {
    await queryRunner.addColumn('users', new _typeorm.TableColumn({
      name: 'shop_id',
      type: 'uuid',
      isNullable: true
    }));
    await queryRunner.createForeignKey('users', new _typeorm.TableForeignKey({
      name: 'UserShop',
      columnNames: ['shop_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'shops',
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropForeignKey('users', 'UserShop');
    await queryRunner.dropColumn('users', 'shop_id');
  }

}

exports.default = AddShopIdToUsers1616249957129;