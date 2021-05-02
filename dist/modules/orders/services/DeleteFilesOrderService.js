"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _IStorageProvider = _interopRequireDefault(require("../../../shared/container/providers/StorageProvider/models/IStorageProvider"));

var _IFilesOrdersRepository = _interopRequireDefault(require("../repositories/IFilesOrdersRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let DeleteFilesOrderService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('FilesOrdersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('StorageProvider')(target, undefined, 1);
}, _dec4 = Reflect.metadata("design:type", Function), _dec5 = Reflect.metadata("design:paramtypes", [typeof _IFilesOrdersRepository.default === "undefined" ? Object : _IFilesOrdersRepository.default, typeof _IStorageProvider.default === "undefined" ? Object : _IStorageProvider.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = class DeleteFilesOrderService {
  constructor(filesOrdersRepository, storageProvider) {
    this.filesOrdersRepository = filesOrdersRepository;
    this.storageProvider = storageProvider;
  }

  async execute({
    id
  }) {
    const file_order = await this.filesOrdersRepository.findByID(id);

    if (!file_order) {
      throw new _AppError.default('File not found');
    }

    await this.storageProvider.deleteFile(file_order.name_file);
    await this.filesOrdersRepository.delete(id);
  }

}) || _class) || _class) || _class) || _class) || _class);
exports.default = DeleteFilesOrderService;