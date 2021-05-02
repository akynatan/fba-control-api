"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _Product = _interopRequireDefault(require("../entities/Product"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Product.default);
  }

  async save(product) {
    await this.ormRepository.save(product);
    return product;
  }

  async create(productData) {
    const product = this.ormRepository.create(productData);
    await this.ormRepository.save(product);
    return product;
  }

  async findAll() {
    const products = await this.ormRepository.find({
      relations: ['product_suppliers', 'product_suppliers.suppliers']
    });
    return products;
  }

  async findByID(id) {
    const product = await this.ormRepository.findOne(id, {
      relations: ['product_suppliers', 'product_suppliers.suppliers']
    });
    return product;
  }

  async delete(id) {
    try {
      await await this.ormRepository.delete({
        id
      });
    } catch (err) {
      console.log(err);
      throw new _AppError.default('Erro');
    }
  }

}

exports.default = ProductsRepository;