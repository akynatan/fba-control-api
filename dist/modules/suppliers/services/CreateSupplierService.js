"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _ISuppliersRepository = _interopRequireDefault(require("../repositories/ISuppliersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateSupplierService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('SuppliersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _ISuppliersRepository.default === "undefined" ? Object : _ISuppliersRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class CreateSupplierService {
  constructor(suppliersRepository, cacheProvider) {
    this.suppliersRepository = suppliersRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    name,
    note,
    tel,
    mail,
    domain,
    id_hubspot
  }) {
    const supplier = await this.suppliersRepository.create({
      name,
      note,
      tel,
      mail,
      domain,
      id_hubspot
    });
    await this.cacheProvider.invalidate(`suppliers`);
    return supplier;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateSupplierService;