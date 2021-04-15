"use strict";

var _tsyringe = require("tsyringe");

require("../../modules/users/providers");

require("./providers");

var _SuppliersRepository = _interopRequireDefault(require("../../modules/suppliers/infra/typeorm/repositories/SuppliersRepository"));

var _ShopsRepository = _interopRequireDefault(require("../../modules/shops/infra/typeorm/repositories/ShopsRepository"));

var _ProductsRepository = _interopRequireDefault(require("../../modules/products/infra/typeorm/repositories/ProductsRepository"));

var _ProductSupplierRepository = _interopRequireDefault(require("../../modules/products/infra/typeorm/repositories/ProductSupplierRepository"));

var _UsersRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UsersRepository"));

var _UserTokensRepository = _interopRequireDefault(require("../../modules/users/infra/typeorm/repositories/UserTokensRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_tsyringe.container.registerSingleton('SuppliersRepository', _SuppliersRepository.default);

_tsyringe.container.registerSingleton('ShopsRepository', _ShopsRepository.default);

_tsyringe.container.registerSingleton('ProductsRepository', _ProductsRepository.default);

_tsyringe.container.registerSingleton('ProductSupplierRepository', _ProductSupplierRepository.default);

_tsyringe.container.registerSingleton('UsersRepository', _UsersRepository.default);

_tsyringe.container.registerSingleton('UserTokensRepository', _UserTokensRepository.default);