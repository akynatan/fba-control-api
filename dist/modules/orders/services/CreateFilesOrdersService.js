"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IFilesOrdersRepository = _interopRequireDefault(require("../repositories/IFilesOrdersRepository"));

var _IOrdersRepository = _interopRequireDefault(require("../repositories/IOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let CreateFilesOrdersService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('OrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('FilesOrdersRepository')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 2);
}, _dec5 = Reflect.metadata("design:type", Function), _dec6 = Reflect.metadata("design:paramtypes", [typeof _IOrdersRepository.default === "undefined" ? Object : _IOrdersRepository.default, typeof _IFilesOrdersRepository.default === "undefined" ? Object : _IFilesOrdersRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = class CreateFilesOrdersService {
  constructor(ordersRepository, filesOrdersRepository, storageProvider) {
    this.ordersRepository = ordersRepository;
    this.filesOrdersRepository = filesOrdersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    order_id,
    fileName,
    originalname
  }) {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new _AppError.default('Order not found');
    }

    const name_file = await this.storageProvider.saveFile(fileName);
    const file_order = await this.filesOrdersRepository.create({
      order_id,
      name_file,
      name_file_original: originalname
    });
    return file_order;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = CreateFilesOrdersService;