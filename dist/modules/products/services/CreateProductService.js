"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IAmazonSellerProvider = _interopRequireDefault(require("../../../shared/container/providers/AmazonProvider/models/IAmazonSellerProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _IProductSupplierRepository = _interopRequireDefault(require("../repositories/IProductSupplierRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let createProductService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductSupplierRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('AmazonSellerProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IProductSupplierRepository.default === "undefined" ? Object : _IProductSupplierRepository.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default, typeof _IAmazonSellerProvider.default === "undefined" ? Object : _IAmazonSellerProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class createProductService {
  constructor(productsRepository, productSupplierRepository, cacheProvider, amazonSellerProvider) {
    this.productsRepository = productsRepository;
    this.productSupplierRepository = productSupplierRepository;
    this.cacheProvider = cacheProvider;
    this.amazonSellerProvider = amazonSellerProvider;
  }

  async execute({
    asin,
    name,
    image,
    brand,
    sku,
    upc,
    note,
    suppliers
  }) {
    const productAmazon = await this.amazonSellerProvider.getDataProduct(sku);
    let newAsin;
    let newName;
    let newImage;
    let newBrand;

    if (productAmazon.Items.length > 0) {
      newAsin = productAmazon.Items[0].Identifiers.MarketplaceASIN.ASIN;
      newName = productAmazon.Items[0].AttributeSets[0].Title;
      newImage = productAmazon.Items[0].AttributeSets[0].SmallImage.URL;
      newBrand = productAmazon.Items[0].AttributeSets[0].Brand;
    }

    const product = await this.productsRepository.create({
      asin: newAsin || asin,
      name: newName || name,
      image: newImage || image,
      brand: newBrand || brand,
      sku,
      note,
      upc
    });
    suppliers.forEach(async supplier => {
      const {
        id,
        sku_supplier,
        note: note_supplier
      } = supplier;
      await this.productSupplierRepository.create({
        supplier_id: id,
        product_id: product.id,
        sku_supplier,
        note: note_supplier
      });
    });
    await this.cacheProvider.invalidate('products-list');
    return product;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = createProductService;