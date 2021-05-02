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

var _ProductsController = _interopRequireDefault(require("../controllers/ProductsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const upload = (0, _multer.default)(_upload.default.multer);
const productsRouter = (0, _express.Router)();
const productsController = new _ProductsController.default();
productsRouter.use(_ensureAuthenticated.default);
productsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().allow(null, ''),
    asin: _celebrate.Joi.string().allow(null, ''),
    sku: _celebrate.Joi.string().required(),
    upc: _celebrate.Joi.string().allow(null, ''),
    note: _celebrate.Joi.string().allow(null, ''),
    suppliers: _celebrate.Joi.array()
  }
}), productsController.create);
productsRouter.put('/sync', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_id: _celebrate.Joi.string().uuid().required(),
    sku: _celebrate.Joi.string().required()
  }
}), productsController.syncAmazon);
productsRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_id: _celebrate.Joi.string().uuid().required(),
    name: _celebrate.Joi.string().allow(null, ''),
    asin: _celebrate.Joi.string().allow(null, ''),
    sku: _celebrate.Joi.string().required(),
    upc: _celebrate.Joi.string().allow(null, ''),
    note: _celebrate.Joi.string().allow(null, '')
  }
}), productsController.update);
productsRouter.get('/', productsController.index);
productsRouter.get('/detail', productsController.detailProduct);
productsRouter.get('/estimate', productsController.getFeesEstimate);
productsRouter.get('/suppliers', productsController.listSupplierProducts);
productsRouter.delete('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_id: _celebrate.Joi.string().required()
  }
}), productsController.delete);
productsRouter.post('/upload', _ensureAuthenticated.default, upload.single('products'), productsController.uploadProducts);
var _default = productsRouter;
exports.default = _default;