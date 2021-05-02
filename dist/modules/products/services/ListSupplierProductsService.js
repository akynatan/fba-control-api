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

let ListSupplierProductsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductSupplierRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductSupplierRepository.default === "undefined" ? Object : _IProductSupplierRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListSupplierProductsService {
  constructor(productSupplierRepository, cacheProvider) {
    this.productSupplierRepository = productSupplierRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    product_id
  }) {
    if (!product_id) {
      throw new _AppError.default('Missing product_id');
    }

    const products = await this.productSupplierRepository.getSuppliers(product_id); // await this.cacheProvider.invalidate('products-list');

    return products;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListSupplierProductsService;