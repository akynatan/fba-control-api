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

let UpdateAllProductsOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsOrderRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsOrderRepository.default === "undefined" ? Object : _IProductsOrderRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateAllProductsOrderService {
  constructor(productsOrderRepository, cacheProvider) {
    this.productsOrderRepository = productsOrderRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute(data) {
    const allProducts = data.map(async product_order => {
      const product_order_mapped = await this.productsOrderRepository.findByID(product_order.id);

      if (!product_order_mapped) {
        return product_order;
      }

      product_order_mapped.qtd = product_order.qtd;
      product_order_mapped.unit_price = product_order.unit_price;
      product_order_mapped.label = product_order.label;
      product_order_mapped.prep = product_order.prep;
      product_order_mapped.other_cost = product_order.other_cost;
      product_order_mapped.buy_box = product_order.buy_box;
      product_order_mapped.note = product_order.note;
      return this.productsOrderRepository.save(product_order_mapped);
    });
    return Promise.all(allProducts);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateAllProductsOrderService;