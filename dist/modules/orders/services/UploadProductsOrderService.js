"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _convertExcelToJson = _interopRequireDefault(require("convert-excel-to-json"));

var _upload = _interopRequireDefault(require("../../../config/upload"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IProductsRepository = _interopRequireDefault(require("../../products/repositories/IProductsRepository"));

var _IProductSupplierRepository = _interopRequireDefault(require("../../products/repositories/IProductSupplierRepository"));

var _IProductsOrderRepository = _interopRequireDefault(require("../repositories/IProductsOrderRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let UploadProductsOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsOrderRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('ProductsRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('ProductSupplierRepository')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IProductsOrderRepository.default === "undefined" ? Object : _IProductsOrderRepository.default, typeof _IProductsRepository.default === "undefined" ? Object : _IProductsRepository.default, typeof _IProductSupplierRepository.default === "undefined" ? Object : _IProductSupplierRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class UploadProductsOrderService {
  constructor(productsOrderRepository, productsRepository, productSupplierRepository, storageProvider) {
    this.productsOrderRepository = productsOrderRepository;
    this.productsRepository = productsRepository;
    this.productSupplierRepository = productSupplierRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    file_name,
    supplier_id,
    order_id
  }) {
    const filename = await this.storageProvider.saveFile(file_name);
    const {
      data
    } = (0, _convertExcelToJson.default)({
      sourceFile: `${_upload.default.uploadsFolder}/${filename}`
    });
    const allProducts = data.slice(1, data.length);
    const products_without_asin = [];
    const products_with_asin_duplicated = [];
    const products_row = allProducts.map(async product => {
      const {
        A: asin,
        B: sku_supplier,
        C: unit_price,
        D: buy_box
      } = product;
      const products_by_asin = await this.productsRepository.findByASIN(asin);

      if (!products_by_asin) {
        products_without_asin.push(asin);
      }

      if (products_by_asin.length > 1) {
        products_with_asin_duplicated.push(asin);
      }

      const products_suppliers = await Promise.all(products_by_asin.map(async product_asin => {
        let product_supplier = product_asin.product_suppliers.find(p => p.supplier_id === supplier_id);

        if (!product_supplier) {
          product_supplier = await this.productSupplierRepository.create({
            product_id: product_asin.id,
            supplier_id,
            sku_supplier
          });
        }

        return { ...product_asin,
          product_suppliers: product_supplier
        };
      }));
      const all_products_orders = products_suppliers.map(async product_s => {
        const product_order = await this.productsOrderRepository.create({
          product_supplier_id: product_s.product_suppliers.id,
          order_id,
          note: 'a',
          buy_box,
          unit_price
        });
        const product_order_response = await this.productsOrderRepository.findByID(product_order.id);
        return product_order_response;
      });
      return Promise.all(all_products_orders);
    });
    const products_returned = await Promise.all(products_row);
    const xx = [];
    products_returned.forEach(pp => pp.forEach(ppp => {
      if (ppp) xx.push(ppp);
    }));
    return {
      products_order: xx,
      products_without_asin,
      products_with_asin_duplicated
    };
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = UploadProductsOrderService;