"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

class CreateInvoiceToOrders1619909679387 {
  async up(queryRunner) {
    await queryRunner.addColumn('orders', new _typeorm.TableColumn({
      name: 'invoice',
      type: 'varchar',
      isNullable: true
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropColumn('orders', 'invoice');
  }

}

exports.default = CreateInvoiceToOrders1619909679387;