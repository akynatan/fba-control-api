"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductSupplierRepository = _interopRequireDefault(require("../../products/repositories/IProductSupplierRepository"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAmazonSellerProvider = _interopRequireDefault(require("../../../shared/container/providers/AmazonProvider/models/IAmazonSellerProvider"));

var _IProductsRepository = _interopRequireDefault(require("../../products/repositories/IProductsRepository"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _IProductsOrderRepository = _interopRequireDefault(require("../repositories/IProductsOrderRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateProductsOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsOrderRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('ProductSupplierRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 3);
}, _dec6 = function (target, key) {
  return (0, _tsyringe.inject)('AmazonSellerProvider')(target, undefined, 4);
}, _dec7 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 5);
}, _dec8 = Reflect.metadata("design:type", Function), _dec9 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IProductsOrderRepository.default === "undefined" ? Object : _IProductsOrderRepository.default, typeof _IProductSupplierRepository.default === "undefined" ? Object : _IProductSupplierRepository.default, typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IAmazonSellerProvider.default === "undefined" ? Object : _IAmazonSellerProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = _dec8(_class = _dec9(_class = class CreateProductsOrderService {
  constructor(ordersRepository, productsOrderRepository, productSupplierRepository, productsRepository, amazonSellerProvider, cacheProvider) {
    this.ordersRepository = ordersRepository;
    this.productsOrderRepository = productsOrderRepository;
    this.productSupplierRepository = productSupplierRepository;
    this.productsRepository = productsRepository;
    this.amazonSellerProvider = amazonSellerProvider;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    product_id,
    order_id,
    unit_price,
    qtd,
    label,
    prep,
    other_cost,
    buy_box,
    note
  }) {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new _AppError.default('Order not found');
    }

    let product_supplier = await this.productSupplierRepository.findBySupplierProduct({
      product_id,
      supplier_id: order.supplier_id
    });

    if (!product_supplier) {
      product_supplier = await this.productSupplierRepository.create({
        product_id,
        supplier_id: order.supplier_id
      });
    }

    let amazon_fee;
    const product = await this.productsRepository.findByID(product_id);

    if (product) {
      const fees = await this.amazonSellerProvider.getMyFeesEstimate({
        asin: product.asin,
        buy_box: buy_box || 0
      });
      amazon_fee = fees.FeesEstimateResult.FeesEstimate.TotalFeesEstimate.Amount;
    }

    const product_order = await this.productsOrderRepository.create({
      product_supplier_id: product_supplier.id,
      unit_price,
      qtd,
      order_id,
      label,
      prep,
      other_cost,
      buy_box,
      note,
      amazon_fee
    });
    const product_order_response = await this.productsOrderRepository.findByID(product_order.id);
    return product_order_response;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateProductsOrderService;