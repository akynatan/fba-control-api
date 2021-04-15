"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductSupplierRepository = _interopRequireDefault(require("../repositories/IProductSupplierRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductSupplierRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductSupplierRepository.default === "undefined" ? Object : _IProductSupplierRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class createProductService {
  constructor(productSupplierRepository, cacheProvider) {
    this.productSupplierRepository = productSupplierRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    product_id,
    supplier_id,
    note,
    sku_supplier
  }) {
    const product_supplier = await this.productSupplierRepository.create({
      product_id,
      supplier_id,
      note,
      sku_supplier
    }); // await this.cacheProvider.invalidate('products-list');

    return product_supplier;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = createProductService;