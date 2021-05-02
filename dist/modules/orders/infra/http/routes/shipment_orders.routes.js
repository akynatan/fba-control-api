"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _celebrate = require("celebrate");

var _ShipmentOrdersController = _interopRequireDefault(require("../controllers/ShipmentOrdersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const shipmentOrdersRouter = (0, _express.Router)();
const shipmentOrdersController = new _ShipmentOrdersController.default();
shipmentOrdersRouter.use(_ensureAuthenticated.default);
shipmentOrdersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    shipment_id: _celebrate.Joi.string().required(),
    note: _celebrate.Joi.string(),
    order_id: _celebrate.Joi.string().uuid()
  }
}), shipmentOrdersController.create);
shipmentOrdersRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    shipment_order_id: _celebrate.Joi.string().required(),
    shipment_id: _celebrate.Joi.string().required(),
    note: _celebrate.Joi.string()
  }
}), shipmentOrdersController.update);
shipmentOrdersRouter.delete('/', shipmentOrdersController.delete);
shipmentOrdersRouter.get('/', shipmentOrdersController.index);
var _default = shipmentOrdersRouter;
exports.default = _default;