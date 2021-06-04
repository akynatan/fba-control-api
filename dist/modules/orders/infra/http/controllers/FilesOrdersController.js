"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _CreateFilesOrdersService = _interopRequireDefault(require("../../../services/CreateFilesOrdersService"));

var _DeleteFilesOrderService = _interopRequireDefault(require("../../../services/DeleteFilesOrderService"));

var _ListFilesFromOrderService = _interopRequireDefault(require("../../../services/ListFilesFromOrderService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FilesOrdersController {
  async create(request, response) {
    const {
      order_id
    } = request.body;
    const {
      originalname,
      filename
    } = request.file;

    const createFilesOrders = _tsyringe.container.resolve(_CreateFilesOrdersService.default);

    const file_order = await createFilesOrders.execute({
      order_id,
      fileName: filename,
      originalname
    });
    return response.json(file_order);
  }

  async delete(request, response) {
    const {
      id
    } = request.query;

    const deleteFilesOrder = _tsyringe.container.resolve(_DeleteFilesOrderService.default);

    await deleteFilesOrder.execute({
      id: String(id)
    });
    return response.json({});
  }

  async index(request, response) {
    const {
      order_id
    } = request.query;

    const listFilesFromOrder = _tsyringe.container.resolve(_ListFilesFromOrderService.default);

    const files_order = await listFilesFromOrder.execute({
      order_id: String(order_id)
    });
    return response.json(files_order);
  }

}

exports.default = FilesOrdersController;