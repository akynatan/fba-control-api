"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ProductsOrderController = _interopRequireDefault(require("../controllers/ProductsOrderController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.default.multer);
const productsOrderRouter = (0, _express.Router)();
const productsOrderController = new _ProductsOrderController.default();
productsOrderRouter.use(_ensureAuthenticated.default);
productsOrderRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_id: _celebrate.Joi.string().uuid().required(),
    order_id: _celebrate.Joi.string().uuid().required(),
    unit_price: _celebrate.Joi.number(),
    qtd: _celebrate.Joi.number(),
    label: _celebrate.Joi.number(),
    prep: _celebrate.Joi.number(),
    other_cost: _celebrate.Joi.number(),
    buy_box: _celebrate.Joi.number(),
    note: _celebrate.Joi.string()
  }
}), productsOrderController.create);
productsOrderRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    data: _celebrate.Joi.array()
  }
}), productsOrderController.update);
productsOrderRouter.put('/estimate', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_order_id: _celebrate.Joi.string().uuid().required(),
    buy_box: _celebrate.Joi.number().required(),
    asin: _celebrate.Joi.string().required()
  }
}), productsOrderController.updateEstimate);
productsOrderRouter.get('/', productsOrderController.index);
productsOrderRouter.delete('/', productsOrderController.delete);
productsOrderRouter.get('/detail', productsOrderController.detail);
productsOrderRouter.post('/upload', _ensureAuthenticated.default, upload.single('products'), productsOrderController.uploadProducts);
var _default = productsOrderRouter;
exports.default = _default;