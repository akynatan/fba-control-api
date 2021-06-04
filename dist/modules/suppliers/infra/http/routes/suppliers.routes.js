"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _SuppliersController = _interopRequireDefault(require("../controllers/SuppliersController"));

var _SyncSuppliersController = _interopRequireDefault(require("../controllers/SyncSuppliersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const suppliersRouter = (0, _express.Router)();
const suppliersController = new _SuppliersController.default();
const syncSuppliersController = new _SyncSuppliersController.default();
suppliersRouter.use(_ensureAuthenticated.default);
suppliersRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    note: _celebrate.Joi.string(),
    tel: _celebrate.Joi.string(),
    mail: _celebrate.Joi.string(),
    domain: _celebrate.Joi.string()
  }
}), suppliersController.create);
suppliersRouter.get('/', suppliersController.index);
suppliersRouter.put('/', suppliersController.update);
suppliersRouter.get('/detail', suppliersController.detailSupplier);
suppliersRouter.get('/products', suppliersController.listProductsSupplier);
suppliersRouter.post('/sync-hubspot', syncSuppliersController.create);
var _default = suppliersRouter;
exports.default = _default;