"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _OrdersController = _interopRequireDefault(require("../controllers/OrdersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ordersRouter = (0, _express.Router)();
const ordersController = new _OrdersController.default();
ordersRouter.use(_ensureAuthenticated.default);
ordersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    date: _celebrate.Joi.date(),
    supplier_id: _celebrate.Joi.string().uuid().required(),
    form_payment: _celebrate.Joi.string(),
    its_paid: _celebrate.Joi.boolean(),
    status: _celebrate.Joi.string(),
    other_cost: _celebrate.Joi.number(),
    shipment_cost: _celebrate.Joi.number(),
    invoice: _celebrate.Joi.string(),
    note: _celebrate.Joi.string()
  }
}), ordersController.create);
ordersRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    order_id: _celebrate.Joi.string().uuid().required(),
    supplier_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date(),
    invoice: _celebrate.Joi.string(),
    other_cost: _celebrate.Joi.number(),
    shipment_cost: _celebrate.Joi.number(),
    form_payment: _celebrate.Joi.string(),
    its_paid: _celebrate.Joi.boolean(),
    status: _celebrate.Joi.string()
  }
}), ordersController.update);
ordersRouter.delete('/', ordersController.delete);
ordersRouter.get('/', ordersController.index);
ordersRouter.get('/detail', ordersController.detail);
ordersRouter.get('/products', ordersController.products);
var _default = ordersRouter;
exports.default = _default;