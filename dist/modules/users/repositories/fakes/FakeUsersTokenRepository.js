"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _UserToken = _interopRequireDefault(require("../../infra/typeorm/entities/UserToken"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class UsersTokenRepository {
  constructor() {
    this.usersToken = [];
  }

  async generate(user_id) {
    const userToken = new _UserToken.default();
    Object.assign(userToken, {
      id: (0, _uuid.v4)(),
      token: (0, _uuid.v4)(),
      user_id,
      created_at: new Date(),
      updated_at: new Date()
    });
    this.usersToken.push(userToken);
    return userToken;
  }

  async findByToken(token) {
    const userToken = this.usersToken.find(findToken => findToken.token === token);
    return userToken;
  }

}

exports.default = UsersTokenRepository;