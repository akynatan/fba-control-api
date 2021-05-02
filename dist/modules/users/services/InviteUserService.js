"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _path = _interopRequireDefault(require("path"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _ICacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/models/ICacheProvider"));

var _IMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/models/IMailProvider"));

var _IUsersRepository = _interopRequireDefault(require("../repositories/IUsersRepository"));

var _IUserTokensRepository = _interopRequireDefault(require("../repositories/IUserTokensRepository"));

var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let InviteUserService = (_dec = (0, _tsyringe.injectable)(), _dec2 = function (target, key) {
  return (0, _tsyringe.inject)('UsersRepository')(target, undefined, 0);
}, _dec3 = function (target, key) {
  return (0, _tsyringe.inject)('MailProvider')(target, undefined, 1);
}, _dec4 = function (target, key) {
  return (0, _tsyringe.inject)('CacheProvider')(target, undefined, 2);
}, _dec5 = function (target, key) {
  return (0, _tsyringe.inject)('UserTokensRepository')(target, undefined, 3);
}, _dec6 = Reflect.metadata("design:type", Function), _dec7 = Reflect.metadata("design:paramtypes", [typeof _IUsersRepository.default === "undefined" ? Object : _IUsersRepository.default, typeof _IMailProvider.default === "undefined" ? Object : _IMailProvider.default, typeof _ICacheProvider.default === "undefined" ? Object : _ICacheProvider.default, typeof _IUserTokensRepository.default === "undefined" ? Object : _IUserTokensRepository.default]), _dec(_class = _dec2(_class = _dec3(_class = _dec4(_class = _dec5(_class = _dec6(_class = _dec7(_class = class InviteUserService {
  constructor(usersRepository, mailProvider, cacheProvider, userTokenRepository) {
    this.usersRepository = usersRepository;
    this.mailProvider = mailProvider;
    this.cacheProvider = cacheProvider;
    this.userTokenRepository = userTokenRepository;
  }

  async execute({
    email,
    shop_id
  }) {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new _AppError.default('Email address already used.');
    }

    const user = await this.usersRepository.invite({
      email,
      shop_id
    });
    const {
      token
    } = await this.userTokenRepository.generate(user.id);

    const inviteUserTemplate = _path.default.resolve(__dirname, '..', 'views', 'invite_user.hbs');

    await this.mailProvider.sendEmail({
      to: {
        name: user.name,
        email: user.email
      },
      subject: '[FBA Controll] Invite',
      templateData: {
        file: inviteUserTemplate,
        variables: {
          link: `${process.env.APP_WEB_URL}/accept-invite?token=${token}`
        }
      }
    });
    return user;
  }

}) || _class) || _class) || _class) || _class) || _class) || _class) || _class);
exports.default = InviteUserService;