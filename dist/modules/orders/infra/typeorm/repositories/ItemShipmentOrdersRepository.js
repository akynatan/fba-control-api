"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _ItemShipmentOrder = _interopRequireDefault(require("../entities/ItemShipmentOrder"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ItemShipmentOrdersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_ItemShipmentOrder.default);
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

  async findByID(id) {
    const shipment_order = await this.ormRepository.findOne(id, {
      relations: ['order']
    });
    return shipment_order;
  }

  async deleteByShipmentID(shipment_id) {
    try {
      await this.ormRepository.delete({
        shipment_order_id: shipment_id
      });
      return true;
    } catch {
      return false;
    }
  }

}

exports.default = ItemShipmentOrdersRepository;