"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ISuppliersRepository = _interopRequireDefault(require("../../suppliers/repositories/ISuppliersRepository"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('SuppliersRepository')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default, typeof _ISuppliersRepository.default === "undefined" ? Object : _ISuppliersRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateOrderService {
  constructor(ordersRepository, cacheProvider, suppliersRepository) {
    this.ordersRepository = ordersRepository;
    this.cacheProvider = cacheProvider;
    this.suppliersRepository = suppliersRepository;
  }

  async execute({
    date,
    supplier_id,
    form_payment,
    its_paid,
    shipment_cost,
    other_cost,
    invoice,
    note,
    status
  }) {
    const supplier = await this.suppliersRepository.findByID(supplier_id);

    if (!supplier) {
      throw new _AppError.default('Supplier not found');
    }

    const order = await this.ordersRepository.create({
      date,
      supplier_id,
      form_payment,
      shipment_cost,
      other_cost,
      its_paid,
      invoice,
      note,
      status
    }); // await this.cacheProvider.invalidate('products-list');

    return order;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateOrderService;