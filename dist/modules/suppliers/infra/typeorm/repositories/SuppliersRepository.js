"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Supplier = _interopRequireDefault(require("../entities/Supplier"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SuppliersRepository {
  constructor() {
    this.ormRepository = void 0;
    this.ormRepository = (0, _typeorm.getRepository)(_Supplier.default);
  }

  async create({
    name,
    note,
    tel,
    mail,
    domain,
    id_hubspot
  }) {
    const supplier = this.ormRepository.create({
      name,
      note,
      tel,
      mail,
      domain,
      id_hubspot
    });
    await this.ormRepository.save(supplier);
    return supplier;
  }

  async findAll() {
    const suppliers = this.ormRepository.find();
    return suppliers;
  }

  async findByID(id) {
    const supplier = this.ormRepository.findOne(id);
    return supplier;
  }

  async findByIDHubspot(id_hubspot) {
    const supplier = this.ormRepository.findOne({
      where: {
        id_hubspot
      }
    });
    return supplier;
  }

  async save(supplier) {
    await this.ormRepository.save(supplier);
    return supplier;
  }

}

exports.default = SuppliersRepository;