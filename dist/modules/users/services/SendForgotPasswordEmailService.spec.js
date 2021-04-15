"use strict";

var _FakeMailProvider = _interopRequireDefault(require("../../../shared/container/providers/MailProvider/fakes/FakeMailProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeUsersRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersRepository"));

var _FakeUsersTokenRepository = _interopRequireDefault(require("../repositories/fakes/FakeUsersTokenRepository"));

var _SendForgotPasswordEmailService = _interopRequireDefault(require("./SendForgotPasswordEmailService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeUsersRepository;
let fakeUsersTokenRepository;
let fakeMailProvider;
let sendForgotPasswordEmail;
describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new _FakeUsersRepository.default();
    fakeUsersTokenRepository = new _FakeUsersTokenRepository.default();
    fakeMailProvider = new _FakeMailProvider.default();
    sendForgotPasswordEmail = new _SendForgotPasswordEmailService.default(fakeUsersRepository, fakeMailProvider, fakeUsersTokenRepository);
  });
  it('should be able to recover the password using the email', async () => {
    await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@dev',
      password: '123456'
    });
    const sendEmail = jest.spyOn(fakeMailProvider, 'sendEmail');
    await sendForgotPasswordEmail.execute({
      email: 'johndoe@dev'
    });
    await expect(sendEmail).toHaveBeenCalled();
  });
  it('should not be able to recover a non-existings user password', async () => {
    await expect(sendForgotPasswordEmail.execute({
      email: 'johndoe@example.com'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should generate a forgot password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokenRepository, 'generate');
    const user = await fakeUsersRepository.create({
      name: 'Jonh Doe',
      email: 'johndoe@dev',
      password: '123456'
    });
    await sendForgotPasswordEmail.execute({
      email: 'johndoe@dev'
    });
    await expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});