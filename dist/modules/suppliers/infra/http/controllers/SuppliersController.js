"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateSupplierService = _interopRequireDefault(require("../../../services/CreateSupplierService"));

var _ListAllSuppliersService = _interopRequireDefault(require("../../../services/ListAllSuppliersService"));

var _DetailSupplierService = _interopRequireDefault(require("../../../services/DetailSupplierService"));

var _ListProductsSupplierService = _interopRequireDefault(require("../../../services/ListProductsSupplierService"));

var _UpdateSupplierService = _interopRequireDefault(require("../../../services/UpdateSupplierService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SuppliersController {
  async create(request, response) {
    const {
      name,
      note,
      tel,
      mail,
      domain
    } = request.body;

    const createSupplier = _tsyringe.container.resolve(_CreateSupplierService.default);

    const supplier = await createSupplier.execute({
      name,
      note,
      tel,
      mail,
      domain
    });
    return response.json(supplier);
  }

  async index(request, response) {
    const listAllSuppliersService = _tsyringe.container.resolve(_ListAllSuppliersService.default);

    const suppliers = await listAllSuppliersService.execute();
    return response.json(suppliers);
  }

  async detailSupplier(request, response) {
    const {
      supplier_id
    } = request.query;

    const detailSupplier = _tsyringe.container.resolve(_DetailSupplierService.default);

    const supplier = await detailSupplier.execute({
      supplier_id: String(supplier_id)
    });
    return response.json(supplier);
  }

  async listProductsSupplier(request, response) {
    const {
      supplier_id
    } = request.query;

    const listProductsSupplier = _tsyringe.container.resolve(_ListProductsSupplierService.default);

    const products = await listProductsSupplier.execute({
      supplier_id: String(supplier_id)
    });
    return response.json(products);
  }

  async update(request, response) {
    const {
      id,
      note
    } = request.body;

    const updateSupplier = _tsyringe.container.resolve(_UpdateSupplierService.default);

    const product = await updateSupplier.execute({
      id,
      note
    });
    return response.json(product);
  }

}

exports.default = SuppliersController;