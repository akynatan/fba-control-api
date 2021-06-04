"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductsOrderRepository = _interopRequireDefault(require("../repositories/IProductsOrderRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DetailProductsOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsOrderRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsOrderRepository.default === "undefined" ? Object : _IProductsOrderRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DetailProductsOrderService {
  constructor(productsOrderRepository, cacheProvider) {
    this.productsOrderRepository = productsOrderRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    product_order_id
  }) {
    const products_order = await this.productsOrderRepository.findByID(product_order_id);

    if (!products_order) {
      throw new _AppError.default('Product Order not found.');
    } // await this.cacheProvider.invalidate('products-list');


    return products_order;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = DetailProductsOrderService;