"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _ProductSupplierController = _interopRequireDefault(require("../controllers/ProductSupplierController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const productSupplierRouter = (0, _express.Router)();
const productSupplierController = new _ProductSupplierController.default();
productSupplierRouter.use(_ensureAuthenticated.default);
productSupplierRouter.put('/alter_supplier', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_supplier_id: _celebrate.Joi.string().required(),
    new_supplier_id: _celebrate.Joi.string().required()
  }
}), productSupplierController.update);
productSupplierRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    supplier_id: _celebrate.Joi.string().required(),
    product_id: _celebrate.Joi.string().required(),
    restriction_to_buy: _celebrate.Joi.boolean(),
    sku_supplier: _celebrate.Joi.string(),
    note: _celebrate.Joi.string()
  }
}), productSupplierController.create);
productSupplierRouter.put('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_supplier_id: _celebrate.Joi.string().required(),
    supplier_id: _celebrate.Joi.string().required(),
    product_id: _celebrate.Joi.string().required(),
    sku_supplier: _celebrate.Joi.string().allow(null, ''),
    note: _celebrate.Joi.string().allow(null, '')
  }
}), productSupplierController.update);
productSupplierRouter.patch('/toggle_restriction_buy', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_supplier_id: _celebrate.Joi.string().required()
  }
}), productSupplierController.toggleRestrictionToBuy);
productSupplierRouter.delete('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    product_supplier_id: _celebrate.Joi.string().required()
  }
}), productSupplierController.delete);
var _default = productSupplierRouter;
exports.default = _default;