"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _suppliers = _interopRequireDefault(require("../../../../modules/suppliers/infra/http/routes/suppliers.routes"));

var _shops = _interopRequireDefault(require("../../../../modules/shops/infra/http/routes/shops.routes"));

var _products = _interopRequireDefault(require("../../../../modules/products/infra/http/routes/products.routes"));

var _product_supplier = _interopRequireDefault(require("../../../../modules/products/infra/http/routes/product_supplier.routes"));

var _users = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/users.routes"));

var _sessions = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/sessions.routes"));

var _password = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/password.routes"));

var _profile = _interopRequireDefault(require("../../../../modules/users/infra/http/routes/profile.routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const routes = (0, _express.Router)();
routes.use('/suppliers', _suppliers.default);
routes.use('/shops', _shops.default);
routes.use('/products', _products.default);
routes.use('/users', _users.default);
routes.use('/sessions', _sessions.default);
routes.use('/password', _password.default);
routes.use('/profile', _profile.default);
routes.use('/product_supplier', _product_supplier.default);
var _default = routes;
exports.default = _default;