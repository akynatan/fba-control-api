"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ShopsController = _interopRequireDefault(require("../controllers/ShopsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const shopsRouter = (0, _express.Router)();
const shopsController = new _ShopsController.default();
shopsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    name: _celebrate.Joi.string().required(),
    token_hubspot: _celebrate.Joi.string().required(),
    token_amazon: _celebrate.Joi.string().required()
  }
}), shopsController.create);
shopsRouter.get('/', shopsController.index);
var _default = shopsRouter;
exports.default = _default;