"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _UpdateProductSupplierService = _interopRequireDefault(require("../../../services/UpdateProductSupplierService"));

var _CreateProductSupplierService = _interopRequireDefault(require("../../../services/CreateProductSupplierService"));

var _DeleteProductSupplierService = _interopRequireDefault(require("../../../services/DeleteProductSupplierService"));

var _ToggleRestrictionToBuyService = _interopRequireDefault(require("../../../services/ToggleRestrictionToBuyService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProductSupplierController {
  async create(request, response) {
    const {
      supplier_id,
      product_id,
      note,
      sku_supplier
    } = request.body;

    const createProductSupplier = _tsyringe.container.resolve(_CreateProductSupplierService.default);

    const product = await createProductSupplier.execute({
      supplier_id,
      product_id,
      note,
      sku_supplier
    });
    return response.json((0, _classTransformer.classToClass)(product));
  }

  async update(request, response) {
    const {
      product_supplier_id,
      supplier_id,
      product_id,
      note,
      sku_supplier
    } = request.body;

    const updateProductSupplier = _tsyringe.container.resolve(_UpdateProductSupplierService.default);

    const product_supplier = await updateProductSupplier.execute({
      product_supplier_id,
      supplier_id,
      product_id,
      note,
      sku_supplier
    });
    return response.json(product_supplier);
  }

  async delete(request, response) {
    const {
      product_supplier_id
    } = request.body;

    const deleteProductSupplier = _tsyringe.container.resolve(_DeleteProductSupplierService.default);

    const product_supplier = await deleteProductSupplier.execute({
      id: product_supplier_id
    });
    return response.json(product_supplier);
  }

  async toggleRestrictionToBuy(request, response) {
    const {
      product_supplier_id
    } = request.body;

    const toggleRestrictionToBuy = _tsyringe.container.resolve(_ToggleRestrictionToBuyService.default);

    const product_supplier = await toggleRestrictionToBuy.execute({
      id: product_supplier_id
    });
    return response.json(product_supplier);
  }

}

exports.default = ProductSupplierController;