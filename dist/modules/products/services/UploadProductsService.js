"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _convertExcelToJson = _interopRequireDefault(require("convert-excel-to-json"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IProductsRepository = _interopRequireDefault(require("../repositories/IProductsRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UploadProductsService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class UploadProductsService {
  constructor(productsRepository, storageProvider) {
    this.productsRepository = productsRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    avatarFileName
  }) {
    const filename = await this.storageProvider.saveFile(avatarFileName);
    console.log('-------------------------------------------');
    console.log(_upload.default.uploadsFolder);
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
        E
      } = product;
      return this.productsRepository.create({
        name: A,
        asin: B,
        note: C,
        sku: D,
        upc: E
      });
    });
    return Promise.all(products);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = UploadProductsService;