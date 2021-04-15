"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _dateFns = require("date-fns");

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IHashProvider = _interopRequireDefault(require("../providers/HashProvider/models/IHashProvider"));

var _IUserTokensRepository = _interopRequireDefault(require("../repositories/IUserTokensRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AcceptInviteUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('HashProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IHashProvider.default === "undefined" ? Object : _IHashProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default, typeof _IUserTokensRepository.default === "undefined" ? Object : _IUserTokensRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class AcceptInviteUserService {
  constructor(usersRepository, hashProvider, cacheProvider, userTokenRepository) {
    this.usersRepository = usersRepository;
    this.hashProvider = hashProvider;
    this.cacheProvider = cacheProvider;
    this.userTokenRepository = userTokenRepository;
  }

  async execute({
    token,
    name,
    password
  }) {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new _AppError.default('User Token does not exists');
    }

    const user = await this.usersRepository.findByID(userToken.user_id);

    if (!user) {
      throw new _AppError.default('User does not exists');
    }

    const tokenCreatedAt = userToken.created_at;
    const compareDate = (0, _dateFns.addHours)(tokenCreatedAt, 2);

    if ((0, _dateFns.isAfter)(Date.now(), compareDate)) {
      throw new _AppError.default('Token expired');
    }

    user.password = await this.hashProvider.generateHash(password);
    user.name = name;
    await this.usersRepository.save(user);
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = AcceptInviteUserService;