"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../../../../../shared/errors/AppError"));

var _ShipmentOrder = _interopRequireDefault(require("../entities/ShipmentOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ShipmentOrdersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_ShipmentOrder.default);
  }

  async save(order) {
    await this.ormRepository.save(order);
    return order;
  }

  async create(shipment_order_data) {
    const shipment_order = this.ormRepository.create(shipment_order_data);
    await this.ormRepository.save(shipment_order);
    return shipment_order;
  }

  async findAll() {
    const shipment_order = await this.ormRepository.find({
      relations: ['order']
    });
    return shipment_order;
  }

  async findByID(id) {
    const shipment_order = await this.ormRepository.findOne(id, {
      relations: ['order']
    });
    return shipment_order;
  }

  async findByOrder(order_id) {
    const shipment_order = await this.ormRepository.find({
      where: {
        order_id
      },
      relations: ['items_shipment']
    });
    return shipment_order;
  }

  async delete(id) {
    try {
      await await this.ormRepository.delete(id);
    } catch (err) {
      throw new _AppError.default('Erro');
    }
  }

}

exports.default = ShipmentOrdersRepository;