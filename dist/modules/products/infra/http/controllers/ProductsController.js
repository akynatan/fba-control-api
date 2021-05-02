"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _GetMyFeesEstimateService = _interopRequireDefault(require("../../../services/GetMyFeesEstimateService"));

var _CreateProductService = _interopRequireDefault(require("../../../services/CreateProductService"));

var _ListAllProductsService = _interopRequireDefault(require("../../../services/ListAllProductsService"));

var _UpdateProductService = _interopRequireDefault(require("../../../services/UpdateProductService"));

var _ListSupplierProductsService = _interopRequireDefault(require("../../../services/ListSupplierProductsService"));

var _DetailProductService = _interopRequireDefault(require("../../../services/DetailProductService"));

var _DeleteProductService = _interopRequireDefault(require("../../../services/DeleteProductService"));

var _UploadProductsService = _interopRequireDefault(require("../../../services/UploadProductsService"));

var _SyncDataProductByAmazonService = _interopRequireDefault(require("../../../services/SyncDataProductByAmazonService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsController {
  async create(request, response) {
    const {
      name,
      asin,
      note,
      sku,
      image,
      brand,
      upc,
      suppliers
    } = request.body;

    const createProduct = _tsyringe.container.resolve(_CreateProductService.default);

    const product = await createProduct.execute({
      asin,
      name,
      image,
      brand,
      note,
      sku,
      upc,
      suppliers
    });
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async index(_, response) {
    const listAllProducts = _tsyringe.container.resolve(_ListAllProductsService.default);

    const products = await listAllProducts.execute();
    return response.json((0, _classTransformer.classToClass)(products));
  }

  async update(request, response) {
    const {
      product_id,
      name,
      asin,
      note,
      sku,
      upc
    } = request.body;

    const updateProduct = _tsyringe.container.resolve(_UpdateProductService.default);

    const product = await updateProduct.execute({
      product_id,
      name,
      asin,
      note,
      sku,
      upc
    });
    return response.json(product);
  }

  async syncAmazon(request, response) {
    const {
      product_id,
      sku
    } = request.body;

    const syncDataProductByAmazon = _tsyringe.container.resolve(_SyncDataProductByAmazonService.default);

    const product = await syncDataProductByAmazon.execute({
      product_id,
      sku
    });
    return response.json(product);
  }

  async getFeesEstimate(request, response) {
    const getMyFeesEstimate = _tsyringe.container.resolve(_GetMyFeesEstimateService.default);

    const fees = await getMyFeesEstimate.execute();
    return response.json(fees);
  }

  async listSupplierProducts(request, response) {
    const {
      product_id
    } = request.query;

    const listSupplierProducts = _tsyringe.container.resolve(_ListSupplierProductsService.default);

    const suppliers = await listSupplierProducts.execute({
      product_id: String(product_id)
    });
    return response.json(suppliers);
  }

  async detailProduct(request, response) {
    const {
      product_id
    } = request.query;

    const detailProductService = _tsyringe.container.resolve(_DetailProductService.default);

    const suppliers = await detailProductService.execute({
      product_id: String(product_id)
    });
    return response.json(suppliers);
  }

  async delete(request, response) {
    const {
      product_id
    } = request.body;

    const deleteProduct = _tsyringe.container.resolve(_DeleteProductService.default);

    const product = await deleteProduct.execute({
      id: product_id
    });
    return response.json(product);
  }

  async uploadProducts(request, response) {
    const uploadProducts = _tsyringe.container.resolve(_UploadProductsService.default);

    const products = await uploadProducts.execute({
      avatarFileName: request.file.filename
    });
    return response.json(products);
  }

}

exports.default = ProductsController;