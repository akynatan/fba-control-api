"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IShipmentOrdersRepository = _interopRequireDefault(require("../repositories/IShipmentOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteShipmentOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ShipmentOrdersRepository')(target, undefined, 0);
}, _dec3 = Reflect.metadata("design:type", Function), _dec4 = Reflect.metadata("design:paramtypes", [typeof _IShipmentOrdersRepository.default === "undefined" ? Object : _IShipmentOrdersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = class DeleteShipmentOrderService {
  constructor(shipmentOrdersRepository) {
    this.shipmentOrdersRepository = shipmentOrdersRepository;
  }

  async execute({
    id
  }) {
    const shipment = await this.shipmentOrdersRepository.findByID(id);

    if (!shipment) {
      throw new _AppError.default('Shipment not found');
    }

    await this.shipmentOrdersRepository.delete(id);
  }

}) || _class) || _class) || _class) || _class);
exports.default = DeleteShipmentOrderService;