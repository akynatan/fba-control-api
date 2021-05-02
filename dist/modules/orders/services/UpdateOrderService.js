"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateOrderService {
  constructor(ordersRepository, cacheProvider) {
    this.ordersRepository = ordersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    order_id,
    supplier_id,
    date,
    invoice,
    other_cost,
    shipment_cost
  }) {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new _AppError.default('Order not found');
    }

    delete order.supplier;
    order.supplier_id = supplier_id;
    order.date = date; // order.invoice = invoice;

    order.other_cost = other_cost;
    order.shipment_cost = shipment_cost;
    await this.ordersRepository.save(order);
    return order;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateOrderService;