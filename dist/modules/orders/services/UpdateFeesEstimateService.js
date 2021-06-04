"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAmazonSellerProvider = _interopRequireDefault(require("../../../shared/container/providers/AmazonProvider/models/IAmazonSellerProvider"));

var _IProductsOrderRepository = _interopRequireDefault(require("../repositories/IProductsOrderRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateFeesEstimateService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsOrderRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AmazonSellerProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsOrderRepository.default === "undefined" ? Object : _IProductsOrderRepository.default, typeof _IAmazonSellerProvider.default === "undefined" ? Object : _IAmazonSellerProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateFeesEstimateService {
  constructor(productsOrderRepository, amazonSellerProvider) {
    this.productsOrderRepository = productsOrderRepository;
    this.amazonSellerProvider = amazonSellerProvider;
  }

  async execute({
    asin,
    buy_box,
    product_order_id
  }) {
    const product_order = await this.productsOrderRepository.findByID(product_order_id);

    if (!product_order) {
      throw new _AppError.default('Product order not found');
    }

    const fees = await this.amazonSellerProvider.getMyFeesEstimate({
      asin,
      buy_box
    });
    product_order.buy_box = buy_box;

    if (fees.FeesEstimateResult) {
      product_order.amazon_fee = fees.FeesEstimateResult.FeesEstimate.TotalFeesEstimate.Amount;
    }

    await this.productsOrderRepository.save(product_order);
    return product_order;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateFeesEstimateService;