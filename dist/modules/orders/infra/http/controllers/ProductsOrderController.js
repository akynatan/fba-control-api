"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateProductsOrderService = _interopRequireDefault(require("../../../services/CreateProductsOrderService"));

var _ListAllProductsOrderService = _interopRequireDefault(require("../../../services/ListAllProductsOrderService"));

var _DetailProductsOrderService = _interopRequireDefault(require("../../../services/DetailProductsOrderService"));

var _DeleteProductsOrderService = _interopRequireDefault(require("../../../services/DeleteProductsOrderService"));

var _UpdateFeesEstimateService = _interopRequireDefault(require("../../../services/UpdateFeesEstimateService"));

var _UpdateAllProductsOrderService = _interopRequireDefault(require("../../../services/UpdateAllProductsOrderService"));

var _UploadProductsOrderService = _interopRequireDefault(require("../../../services/UploadProductsOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductsOrderController {
  async create(request, response) {
    const {
      product_id,
      order_id,
      unit_price,
      qtd,
      label,
      prep,
      other_cost,
      buy_box,
      note
    } = request.body;

    const createProductsOrder = _tsyringe.container.resolve(_CreateProductsOrderService.default);

    const product_order = await createProductsOrder.execute({
      product_id,
      order_id,
      unit_price,
      qtd,
      label,
      prep,
      other_cost,
      buy_box,
      note
    });
    return response.json(product_order);
  }

  async update(request, response) {
    const {
      data
    } = request.body;

    const updateAllProductsOrder = _tsyringe.container.resolve(_UpdateAllProductsOrderService.default);

    const products_order = await updateAllProductsOrder.execute(data);
    return response.json(products_order);
  }

  async updateEstimate(request, response) {
    const {
      product_order_id,
      asin,
      buy_box
    } = request.body;

    const updateFeesEstimate = _tsyringe.container.resolve(_UpdateFeesEstimateService.default);

    const product_order = await updateFeesEstimate.execute({
      product_order_id,
      asin,
      buy_box
    });
    return response.json(product_order);
  }

  async delete(request, response) {
    const {
      product_order_id
    } = request.body;

    const deleteProductsOrder = _tsyringe.container.resolve(_DeleteProductsOrderService.default);

    await deleteProductsOrder.execute({
      id: product_order_id
    });
    return response.json({});
  }

  async index(request, response) {
    const listAllProductsOrder = _tsyringe.container.resolve(_ListAllProductsOrderService.default);

    const products_order = await listAllProductsOrder.execute();
    return response.json(products_order);
  }

  async detail(request, response) {
    const {
      product_order_id
    } = request.query;

    const detailProductsOrder = _tsyringe.container.resolve(_DetailProductsOrderService.default);

    const product_order = await detailProductsOrder.execute({
      product_order_id: String(product_order_id)
    });
    return response.json(product_order);
  }

  async uploadProducts(request, response) {
    const {
      order_id,
      supplier_id
    } = request.body;

    const uploadProductsOrder = _tsyringe.container.resolve(_UploadProductsOrderService.default);

    const products = await uploadProductsOrder.execute({
      file_name: request.file.filename,
      order_id,
      supplier_id
    });
    return response.json(products);
  }

}

exports.default = ProductsOrderController;