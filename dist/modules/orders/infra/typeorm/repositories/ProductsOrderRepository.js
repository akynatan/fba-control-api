"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _ProductsOrder = _interopRequireDefault(require("../entities/ProductsOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsOrderRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_ProductsOrder.default);
  }

  async save(product_order) {
    await this.ormRepository.save(product_order);
    return product_order;
  }

  async create(productOrderData) {
    const product_order = this.ormRepository.create(productOrderData);
    await this.ormRepository.save(product_order);
    return product_order;
  }

  async findAll() {
    const products_order = await this.ormRepository.find({
      relations: ['product_supplier', 'product_supplier.products']
    });
    return products_order;
  }

  async findByID(id) {
    const products_order = await this.ormRepository.findOne(id, {
      relations: ['product_supplier', 'product_supplier.products']
    });
    return products_order;
  }

  async getProducts(order_id) {
    const products = await this.ormRepository.find({
      where: {
        order_id
      },
      relations: ['product_supplier', 'product_supplier.products']
    });
    return products;
  }

  async delete(id) {
    try {
      await await this.ormRepository.delete({
        id
      });
    } catch (err) {
      throw new _AppError.default('Erro');
    }
  }

}

exports.default = ProductsOrderRepository;