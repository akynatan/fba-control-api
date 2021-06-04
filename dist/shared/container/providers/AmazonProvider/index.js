"use strict";

var _tsyringe = require("tsyringe");

var _AmazonSellerProvider = _interopRequireDefault(require("./implementations/AmazonSellerProvider"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerInstance('AmazonSellerProvider', _tsyringe.container.resolve(_AmazonSellerProvider.default));