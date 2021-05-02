"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IProductSupplierRepository = _interopRequireDefault(require("../repositories/IProductSupplierRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateProductSupplierService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductSupplierRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductSupplierRepository.default === "undefined" ? Object : _IProductSupplierRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateProductSupplierService {
  constructor(productSupplierRepository, cacheProvider) {
    this.productSupplierRepository = productSupplierRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    product_supplier_id,
    supplier_id,
    product_id,
    note,
    sku_supplier
  }) {
    const product_supplier = await this.productSupplierRepository.findByID(product_supplier_id);

    if (!product_supplier) {
      throw new _AppError.default('Product Supplier does not exist');
    }

    product_supplier.supplier_id = supplier_id;
    product_supplier.product_id = product_id;
    product_supplier.note = note;
    product_supplier.sku_supplier = sku_supplier;
    await this.productSupplierRepository.save(product_supplier); // await this.cacheProvider.invalidate('products-list');

    return product_supplier;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateProductSupplierService;