"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _classTransformer = require("class-transformer");

var _CreateUserService = _interopRequireDefault(require("../../../services/CreateUserService"));

var _UpdateUserAvatarService = _interopRequireDefault(require("../../../services/UpdateUserAvatarService"));

var _InviteUserService = _interopRequireDefault(require("../../../services/InviteUserService"));

var _AcceptEnviteUserService = _interopRequireDefault(require("../../../services/AcceptEnviteUserService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersController {
  async create(request, response) {
    const {
      name,
      email,
      password
    } = request.body;

    const createUser = _tsyringe.container.resolve(_CreateUserService.default);

    const user = await createUser.execute({
      name,
      email,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async invite(request, response) {
    const {
      email,
      shop_id
    } = request.body;

    const inviteUser = _tsyringe.container.resolve(_InviteUserService.default);

    const user = await inviteUser.execute({
      email,
      shop_id
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async acceptInvite(request, response) {
    const {
      token,
      name,
      password
    } = request.body;

    const acceptInviteUser = _tsyringe.container.resolve(_AcceptEnviteUserService.default);

    const user = await acceptInviteUser.execute({
      token,
      name,
      password
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

  async updateAvatar(request, response) {
    const updateUserAvatarService = _tsyringe.container.resolve(_UpdateUserAvatarService.default);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFileName: request.file.filename
    });
    return response.json((0, _classTransformer.classToClass)(user));
  }

}

exports.default = UsersController;