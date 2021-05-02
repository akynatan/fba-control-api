"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductSupplierRepository = _interopRequireDefault(require("../repositories/IProductSupplierRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AlterSupplierForProductSupplierService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductSupplierRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductSupplierRepository.default === "undefined" ? Object : _IProductSupplierRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class AlterSupplierForProductSupplierService {
  constructor(productSupplierRepository, cacheProvider) {
    this.productSupplierRepository = productSupplierRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    id,
    new_supplier_id
  }) {
    const product_supplier = await this.productSupplierRepository.findByID(id);

    if (!product_supplier) {
      throw new _AppError.default('Product Supplier not found.');
    }

    product_supplier.supplier_id = new_supplier_id;
    const x = await this.productSupplierRepository.save(product_supplier);
    console.log(x); // await this.cacheProvider.invalidate('products-list');

    const product_supplier_updated = await this.productSupplierRepository.findByID(id); // console.log(product_supplier_updated);

    return product_supplier_updated || product_supplier;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = AlterSupplierForProductSupplierService;