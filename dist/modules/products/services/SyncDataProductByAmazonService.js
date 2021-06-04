"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IAmazonSellerProvider = _interopRequireDefault(require("../../../shared/container/providers/AmazonProvider/models/IAmazonSellerProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SyncDataProductByAmazonService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('AmazonSellerProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default, typeof _IAmazonSellerProvider.default === "undefined" ? Object : _IAmazonSellerProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class SyncDataProductByAmazonService {
  constructor(productsRepository, cacheProvider, amazonSellerProvider) {
    this.productsRepository = productsRepository;
    this.cacheProvider = cacheProvider;
    this.amazonSellerProvider = amazonSellerProvider;
  }

  async execute({
    product_id,
    sku
  }) {
    const product = await this.productsRepository.findByID(product_id);

    if (!product) {
      throw new _AppError.default('Product not found.');
    }

    const productAmazon = await this.amazonSellerProvider.getDataProduct(sku);
    console.log(productAmazon.Items);

    if (productAmazon.Items.length <= 0) {
      throw new _AppError.default('Product not found.', 404);
    }

    product.asin = productAmazon.Items[0].Identifiers.MarketplaceASIN.ASIN;
    product.name = productAmazon.Items[0].AttributeSets[0].Title;
    product.image = productAmazon.Items[0].AttributeSets[0].SmallImage.URL;
    product.brand = productAmazon.Items[0].AttributeSets[0].Brand;
    await this.productsRepository.save(product); // await this.cacheProvider.invalidate('products-list');

    return product;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = SyncDataProductByAmazonService;