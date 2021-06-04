"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _IShipmentOrdersRepository = _interopRequireDefault(require("../repositories/IShipmentOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListShipmentFromOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ShipmentOrdersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IShipmentOrdersRepository.default === "undefined" ? Object : _IShipmentOrdersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListShipmentFromOrderService {
  constructor(ordersRepository, shipmentOrdersRepository) {
    this.ordersRepository = ordersRepository;
    this.shipmentOrdersRepository = shipmentOrdersRepository;
  }

  async execute({
    order_id
  }) {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new _AppError.default('Order not found');
    }

    const shipments = await this.shipmentOrdersRepository.findByOrder(order_id);
    return shipments;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListShipmentFromOrderService;