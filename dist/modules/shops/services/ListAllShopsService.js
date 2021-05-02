"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IShopsRepository = _interopRequireDefault(require("../repositories/IShopsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let ListAllShopsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ShopsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IShopsRepository.default === "undefined" ? Object : _IShopsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class ListAllShopsService {
  constructor(shopsRepository, cacheProvider) {
    this.shopsRepository = shopsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute() {
    const shops = await this.shopsRepository.listAll();
    return shops;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = ListAllShopsService;