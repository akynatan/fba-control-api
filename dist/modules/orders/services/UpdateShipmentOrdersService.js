"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IAmazonSellerProvider = _interopRequireDefault(require("../../../shared/container/providers/AmazonProvider/models/IAmazonSellerProvider"));

var _IShipmentOrdersRepository = _interopRequireDefault(require("../repositories/IShipmentOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UpdateShipmentOrdersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ShipmentOrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('AmazonSellerProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IShipmentOrdersRepository.default === "undefined" ? Object : _IShipmentOrdersRepository.default, typeof _IAmazonSellerProvider.default === "undefined" ? Object : _IAmazonSellerProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UpdateShipmentOrdersService {
  constructor(shipmentOrdersRepository, amazonSellerProvider) {
    this.shipmentOrdersRepository = shipmentOrdersRepository;
    this.amazonSellerProvider = amazonSellerProvider;
  }

  async execute({
    shipment_order_id,
    shipment_id,
    note
  }) {
    const shipment_order = await this.shipmentOrdersRepository.findByID(shipment_order_id);

    if (!shipment_order) {
      throw new _AppError.default('Shipment not found');
    }

    const shipment = await this.amazonSellerProvider.getShipment(shipment_id);
    const {
      TransportContent
    } = shipment;
    const {
      IsPartnered,
      ShipmentType
    } = TransportContent.TransportHeader;
    let cost = 0;

    if (IsPartnered) {
      if (ShipmentType === 'SP') {
        cost = TransportContent.TransportDetails.PartneredSmallParcelData.PartneredEstimate.Amount.Value;
      }
    }

    shipment_order.shipment_id = shipment_id;
    shipment_order.note = note;
    await this.shipmentOrdersRepository.save(shipment_order);
    return shipment_order;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UpdateShipmentOrdersService;