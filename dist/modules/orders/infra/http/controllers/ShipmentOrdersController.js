"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateShipmentOrdersService = _interopRequireDefault(require("../../../services/CreateShipmentOrdersService"));

var _DeleteShipmentOrderService = _interopRequireDefault(require("../../../services/DeleteShipmentOrderService"));

var _ListShipmentFromOrderService = _interopRequireDefault(require("../../../services/ListShipmentFromOrderService"));

var _UpdateShipmentOrdersService = _interopRequireDefault(require("../../../services/UpdateShipmentOrdersService"));

var _SyncManyShipmentOrderService = _interopRequireDefault(require("../../../services/SyncManyShipmentOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShipmentOrdersController {
  async create(request, response) {
    const {
      order_id,
      shipment_id,
      note
    } = request.body;

    const createShipmentOrders = _tsyringe.container.resolve(_CreateShipmentOrdersService.default);

    const shipment_order = await createShipmentOrders.execute({
      order_id,
      shipment_id,
      note
    });
    return response.json(shipment_order);
  }

  async update(request, response) {
    const {
      shipment_order_id,
      shipment_id,
      note
    } = request.body;

    const updateShipmentOrders = _tsyringe.container.resolve(_UpdateShipmentOrdersService.default);

    const shipment_order = await updateShipmentOrders.execute({
      shipment_order_id,
      shipment_id,
      note
    });
    return response.json(shipment_order);
  }

  async delete(request, response) {
    const {
      id
    } = request.body;

    const deleteShipmentOrder = _tsyringe.container.resolve(_DeleteShipmentOrderService.default);

    await deleteShipmentOrder.execute({
      id
    });
    return response.json({});
  }

  async syncMany(request, response) {
    const {
      shipments_order_id
    } = request.body;

    const syncManyShipmentOrder = _tsyringe.container.resolve(_SyncManyShipmentOrderService.default);

    const shipments = await syncManyShipmentOrder.execute({
      shipments_order_id
    });
    return response.json(shipments);
  }

  async index(request, response) {
    const {
      order_id
    } = request.query;

    const listShipmentFromOrder = _tsyringe.container.resolve(_ListShipmentFromOrderService.default);

    const shipment = await listShipmentFromOrder.execute({
      order_id: String(order_id)
    });
    return response.json(shipment);
  }

}

exports.default = ShipmentOrdersController;