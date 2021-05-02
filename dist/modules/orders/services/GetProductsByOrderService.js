"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _IProductsOrderRepository = _interopRequireDefault(require("../repositories/IProductsOrderRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let GetProductsByOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsOrderRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IProductsOrderRepository.default === "undefined" ? Object : _IProductsOrderRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class GetProductsByOrderService {
  constructor(ordersRepository, productsOrderRepository, cacheProvider) {
    this.ordersRepository = ordersRepository;
    this.productsOrderRepository = productsOrderRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    order_id
  }) {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new _AppError.default('Order not found');
    }

    const products = await this.productsOrderRepository.getProducts(order_id); // await this.cacheProvider.invalidate('products-list');

    return products;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = GetProductsByOrderService;