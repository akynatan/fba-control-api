"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _ProductSupplier = _interopRequireDefault(require("../entities/ProductSupplier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductSupplierRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_ProductSupplier.default);
  }

  async create(productSupplierData) {
    const productSupplier = this.ormRepository.create(productSupplierData);
    await this.ormRepository.save(productSupplier);
    return productSupplier;
  }

  async getSuppliers(product_id) {
    const suppliers = await this.ormRepository.find({
      where: {
        product_id
      },
      relations: ['suppliers']
    });
    return suppliers;
  }

  async getProducts(supplier_id) {
    const products = await this.ormRepository.find({
      where: {
        supplier_id
      },
      relations: ['products']
    });
    return products;
  }

  async save(product_supplier) {
    await this.ormRepository.save(product_supplier);
    return product_supplier;
  }

  async findByID(id) {
    const product_supplier = await this.ormRepository.findOne(id, {
      relations: ['suppliers', 'products']
    });
    return product_supplier;
  }

  async delete(id) {
    await await this.ormRepository.delete({
      id
    });
  }

  async findBySupplierProduct({
    product_id,
    supplier_id
  }) {
    const product_supplier = await this.ormRepository.findOne({
      where: {
        product_id,
        supplier_id
      }
    });
    return product_supplier;
  }

}

exports.default = ProductSupplierRepository;