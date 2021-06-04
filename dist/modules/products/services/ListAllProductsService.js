"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listAllProductsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class listAllProductsService {
  constructor(productsRepository, cacheProvider) {
    this.productsRepository = productsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute() {
    const cacheKey = `products-list`; // let products = await this.cacheProvider.recover<Product[]>(cacheKey);

    let products;

    if (!products) {
      products = await this.productsRepository.findAll();
      await this.cacheProvider.save(cacheKey, products);
    }

    return products;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = listAllProductsService;