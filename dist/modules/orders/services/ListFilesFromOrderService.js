"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IFilesOrdersRepository = _interopRequireDefault(require("../repositories/IFilesOrdersRepository"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListFilesFromOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('FilesOrdersRepository')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IFilesOrdersRepository.default === "undefined" ? Object : _IFilesOrdersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListFilesFromOrderService {
  constructor(ordersRepository, filesOrdersRepository) {
    this.ordersRepository = ordersRepository;
    this.filesOrdersRepository = filesOrdersRepository;
  }

  async execute({
    order_id
  }) {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new _AppError.default('Order not found');
    }

    const files_order = await this.filesOrdersRepository.findByOrder(order_id);
    return files_order;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListFilesFromOrderService;