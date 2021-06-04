"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductsOrderRepository = _interopRequireDefault(require("../repositories/IProductsOrderRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllProductsOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsOrderRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsOrderRepository.default === "undefined" ? Object : _IProductsOrderRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListAllProductsOrderService {
  constructor(productsOrderRepository, cacheProvider) {
    this.productsOrderRepository = productsOrderRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute() {
    const cacheKey = `products-list`; // let products = await this.cacheProvider.recover<Product[]>(cacheKey);

    let products_order;

    if (!products_order) {
      products_order = await this.productsOrderRepository.findAll();
      await this.cacheProvider.save(cacheKey, products_order);
    }

    return products_order;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListAllProductsOrderService;