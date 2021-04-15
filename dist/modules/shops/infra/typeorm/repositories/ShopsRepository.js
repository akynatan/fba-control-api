"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Shop = _interopRequireDefault(require("../entities/Shop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShopsRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Shop.default);
  }

  async findByName(name) {
    const shop = await this.ormRepository.findOne({
      where: {
        name
      }
    });
    return shop;
  }

  async create(shopData) {
    const shop = this.ormRepository.create(shopData);
    await this.ormRepository.save(shop);
    return shop;
  }

  async listAll() {
    const shops = this.ormRepository.find();
    return shops;
  }

}

exports.default = ShopsRepository;