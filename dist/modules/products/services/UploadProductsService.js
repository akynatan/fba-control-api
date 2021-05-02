"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _convertExcelToJson = _interopRequireDefault(require("convert-excel-to-json"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IAmazonSellerProvider = _interopRequireDefault(require("../../../shared/container/providers/AmazonProvider/models/IAmazonSellerProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UploadProductsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('AmazonSellerProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default, typeof _IAmazonSellerProvider.default === "undefined" ? Object : _IAmazonSellerProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class UploadProductsService {
  constructor(productsRepository, storageProvider, amazonSellerProvider) {
    this.productsRepository = productsRepository;
    this.storageProvider = storageProvider;
    this.amazonSellerProvider = amazonSellerProvider;
  }

  async execute({
    avatarFileName
  }) {
    const filename = await this.storageProvider.saveFile(avatarFileName);
    const {
      data
    } = (0, _convertExcelToJson.default)({
      sourceFile: `${_upload.default.uploadsFolder}/${filename}`
    });
    const allProducts = data.slice(1, data.length);
    const products = allProducts.map(async product => {
      const {
        A,
        B,
        C,
        D,
        E,
        F
      } = product;
      let newName = A;
      const newSKU = B;
      let newAsin = C;
      const newUPC = D;
      const newNote = E;
      let newBrand = F;
      let newImage;
      const productAmazon = await this.amazonSellerProvider.getDataProduct(newSKU.trim());

      if (productAmazon.Items.length > 0) {
        newAsin = productAmazon.Items[0].Identifiers.MarketplaceASIN.ASIN;
        newName = productAmazon.Items[0].AttributeSets[0].Title;
        newImage = productAmazon.Items[0].AttributeSets[0].SmallImage.URL;
        newBrand = productAmazon.Items[0].AttributeSets[0].Brand;
      }

      const product_created = await this.productsRepository.create({
        name: newName,
        sku: newSKU,
        asin: newAsin,
        image: newImage,
        brand: newBrand,
        note: newNote,
        upc: newUPC
      });
      return product_created;
    });
    return Promise.all(products);
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UploadProductsService;