"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _IAmazonSellerProvider = _interopRequireDefault(require("../../../shared/container/providers/AmazonProvider/models/IAmazonSellerProvider"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _IShipmentOrdersRepository = _interopRequireDefault(require("../repositories/IShipmentOrdersRepository"));

var _IItemShipmentOrdersRepository = _interopRequireDefault(require("../repositories/IItemShipmentOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SyncManyShipmentOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ShipmentOrdersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('ItemShipmentOrdersRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('AmazonSellerProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IShipmentOrdersRepository.default === "undefined" ? Object : _IShipmentOrdersRepository.default, typeof _IItemShipmentOrdersRepository.default === "undefined" ? Object : _IItemShipmentOrdersRepository.default, typeof _IAmazonSellerProvider.default === "undefined" ? Object : _IAmazonSellerProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class SyncManyShipmentOrderService {
  constructor(ordersRepository, shipmentOrdersRepository, itemShipmentOrdersRepository, amazonSellerProvider) {
    this.ordersRepository = ordersRepository;
    this.shipmentOrdersRepository = shipmentOrdersRepository;
    this.itemShipmentOrdersRepository = itemShipmentOrdersRepository;
    this.amazonSellerProvider = amazonSellerProvider;
  }

  async execute({
    shipments_order_id
  }) {
    const shipments_updated = shipments_order_id.map(async shipment_id => {
      const shipment_order = await this.shipmentOrdersRepository.findByID(shipment_id);

      if (!shipment_order) {
        return {};
      }

      const shipment_amazon = await this.amazonSellerProvider.getShipment(shipment_order.shipment_id);
      let cost = 0;
      const {
        TransportContent
      } = shipment_amazon;

      if (TransportContent) {
        const {
          IsPartnered,
          ShipmentType
        } = TransportContent.TransportHeader;

        if (IsPartnered) {
          if (ShipmentType === 'SP') {
            cost = TransportContent.TransportDetails.PartneredSmallParcelData.PartneredEstimate.Amount.Value;
          }

          if (ShipmentType === 'LTL') {
            cost = TransportContent.TransportDetails.PartneredLtlData.PartneredEstimate.Amount.Value;
          }
        }
      }

      shipment_order.cost = cost;
      let status = '';
      const status_shipment = await this.amazonSellerProvider.getStatusByShipment(shipment_order.shipment_id);
      const {
        ShipmentData
      } = status_shipment;

      if (ShipmentData.length > 0) {
        status = ShipmentData[0].ShipmentStatus;
      }

      shipment_order.status = status;
      const items_shipment = await this.amazonSellerProvider.getItemsByShipment(shipment_order.shipment_id);
      await this.itemShipmentOrdersRepository.deleteByShipmentID(shipment_id);
      shipment_order.items_shipment = [];

      if (items_shipment.ItemData) {
        const all_items_shipments = items_shipment.ItemData.map(async item => {
          const item_shipment_created = await this.itemShipmentOrdersRepository.create({
            qtd_received: item.QuantityReceived,
            qtd_shipped: item.QuantityShipped,
            sku: item.SellerSKU,
            shipment_order_id: shipment_order.id
          });
          return item_shipment_created;
        });
        const all_items_shipments_response = await Promise.all(all_items_shipments);
        shipment_order.items_shipment = all_items_shipments_response;
      }

      await this.shipmentOrdersRepository.save(shipment_order);
      return shipment_order;
    });
    return Promise.all(shipments_updated);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = SyncManyShipmentOrderService;