"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateOrderService = _interopRequireDefault(require("../../../services/CreateOrderService"));

var _ListAllOrdersService = _interopRequireDefault(require("../../../services/ListAllOrdersService"));

var _DetailOrderService = _interopRequireDefault(require("../../../services/DetailOrderService"));

var _GetProductsByOrderService = _interopRequireDefault(require("../../../services/GetProductsByOrderService"));

var _UpdateOrderService = _interopRequireDefault(require("../../../services/UpdateOrderService"));

var _DeleteOrderService = _interopRequireDefault(require("../../../services/DeleteOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class OrdersController {
  async create(request, response) {
    const {
      date,
      supplier_id,
      form_payment,
      other_cost,
      shipment_cost,
      its_paid,
      invoice,
      status,
      note
    } = request.body;

    const createOrder = _tsyringe.container.resolve(_CreateOrderService.default);

    const order = await createOrder.execute({
      date,
      supplier_id,
      form_payment,
      its_paid,
      other_cost,
      invoice,
      shipment_cost,
      status,
      note
    });
    return response.json(order);
  }

  async update(request, response) {
    const {
      order_id,
      supplier_id,
      date,
      invoice,
      other_cost,
      shipment_cost,
      form_payment,
      its_paid,
      status
    } = request.body;

    const updateOrder = _tsyringe.container.resolve(_UpdateOrderService.default);

    const order = await updateOrder.execute({
      order_id,
      supplier_id,
      date,
      invoice,
      other_cost,
      shipment_cost,
      form_payment,
      its_paid,
      status
    });
    return response.json(order);
  }

  async delete(request, response) {
    const {
      order_id
    } = request.body;

    const deleteOrder = _tsyringe.container.resolve(_DeleteOrderService.default);

    await deleteOrder.execute({
      id: order_id
    });
    return response.json({});
  }

  async index(_, response) {
    const listAllOrders = _tsyringe.container.resolve(_ListAllOrdersService.default);

    const orders = await listAllOrders.execute();
    return response.json(orders);
  }

  async detail(request, response) {
    const {
      order_id
    } = request.query;

    const detailOrder = _tsyringe.container.resolve(_DetailOrderService.default);

    const order = await detailOrder.execute({
      order_id: String(order_id)
    });
    return response.json(order);
  }

  async products(request, response) {
    const {
      order_id
    } = request.query;

    const getProductsByOrder = _tsyringe.container.resolve(_GetProductsByOrderService.default);

    const order = await getProductsByOrder.execute({
      order_id: String(order_id)
    });
    return response.json(order);
  }

}

exports.default = OrdersController;