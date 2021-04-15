"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let updateProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class updateProductService {
  constructor(productsRepository, cacheProvider) {
    this.productsRepository = productsRepository;
    this.cacheProvider = cacheProvider;
  }

  async execute({
    product_id,
    name,
    asin,
    sku,
    upc,
    note
  }) {
    const product = await this.productsRepository.findByID(product_id);

    if (!product) {
      throw new _AppError.default('Product not found.');
    }

    product.name = name;
    product.asin = asin;
    product.sku = sku;
    product.upc = upc;
    product.note = note;
    this.productsRepository.save(product); // await this.cacheProvider.invalidate('products-list');

    return product;
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = updateProductService;