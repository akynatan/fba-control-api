"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateShopService = _interopRequireDefault(require("../../../services/CreateShopService"));

var _ListAllShopsService = _interopRequireDefault(require("../../../services/ListAllShopsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      token_hubspot,
      token_amazon
    } = request.body;

    const createShop = _tsyringe.container.resolve(_CreateShopService.default);

    const shop = await createShop.execute({
      name,
      token_hubspot,
      token_amazon
    });
    return response.json((0, _classTransformer.classToClass)(shop));
  }

  async index(request, response) {
    const listAllShops = _tsyringe.container.resolve(_ListAllShopsService.default);

    const shops = await listAllShops.execute();
    return response.json(shops);
  }

}

exports.default = UsersController;