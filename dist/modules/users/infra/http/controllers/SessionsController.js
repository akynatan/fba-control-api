"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _AuthenticationUserService = _interopRequireDefault(require("../../../services/AuthenticationUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async auth(request, response) {
    const {
      email,
      password
    } = request.body;

    const authenticationUser = _tsyringe.container.resolve(_AuthenticationUserService.default);

    const {
      user,
      token
    } = await authenticationUser.execute({
      email,
      password
    });
    return response.json({
      user: (0, _classTransformer.classToClass)(user),
      token
    });
  }

}

exports.default = UsersController;