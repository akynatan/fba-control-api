"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _FilesOrders = _interopRequireDefault(require("../entities/FilesOrders"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FilesOrdersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_FilesOrders.default);
  }

  async save(order) {
    await this.ormRepository.save(order);
    return order;
  }

  async create(orderData) {
    const order = this.ormRepository.create(orderData);
    await this.ormRepository.save(order);
    return order;
  }

  async findAll() {
    const orders = await this.ormRepository.find({
      relations: ['order']
    });
    return orders;
  }

  async findByID(id) {
    const order = await this.ormRepository.findOne(id, {
      relations: ['order']
    });
    return order;
  }

  async findByOrder(order_id) {
    const files_orders = await this.ormRepository.find({
      where: {
        order_id
      }
    });
    return files_orders;
  }

  async delete(id) {
    try {
      await await this.ormRepository.delete({
        id
      });
    } catch (err) {
      throw new _AppError.default('Erro');
    }
  }

}

exports.default = FilesOrdersRepository;