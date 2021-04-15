"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _SyncSuppliersHubspotService = _interopRequireDefault(require("../../../services/SyncSuppliersHubspotService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SyncSuppliersController {
  async create(request, response) {
    const SyncSuppliersHubspot = _tsyringe.container.resolve(_SyncSuppliersHubspotService.default);

    const suppliers = await SyncSuppliersHubspot.execute(); // console.log(suppliers);

    return response.json(suppliers);
  }

}

exports.default = SyncSuppliersController;