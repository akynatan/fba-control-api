"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _ensureAuthenticated = _interopRequireDefault(require("../../../../users/infra/http/middlewares/ensureAuthenticated"));

var _multer = _interopRequireDefault(require("multer"));

var _upload = _interopRequireDefault(require("../../../../../config/upload"));

var _FilesOrdersController = _interopRequireDefault(require("../controllers/FilesOrdersController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const filesOrdersRouter = (0, _express.Router)();
const upload = (0, _multer.default)(_upload.default.multer);
const filesOrdersController = new _FilesOrdersController.default();
filesOrdersRouter.use(_ensureAuthenticated.default);
filesOrdersRouter.post('/', upload.single('file'), filesOrdersController.create);
filesOrdersRouter.delete('/', filesOrdersController.delete);
filesOrdersRouter.get('/', _ensureAuthenticated.default, filesOrdersController.index);
var _default = filesOrdersRouter;
exports.default = _default;