"use strict";

var _FakeNotificationRepository = _interopRequireDefault(require("../../notifications/repositories/fakes/FakeNotificationRepository"));

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/fakes/FakeCacheProvider"));

var _AppError = _interopRequireDefault(require("../../../shared/errors/AppError"));

var _FakeAppointmentsRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("./CreateAppointmentService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let fakeNotificationRepository;
let fakeCacheProvider;
let createAppointmentService;
describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentsRepository.default();
    fakeNotificationRepository = new _FakeNotificationRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    createAppointmentService = new _CreateAppointmentService.default(fakeAppointmentsRepository, fakeNotificationRepository, fakeCacheProvider);
  });
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 12).getTime());
    const appointment = await createAppointmentService.execute({
      date: new Date(2021, 4, 10, 13),
      user_id: 'user-id',
      provider_id: 'provider-id'
    });
    await expect(appointment).toHaveProperty('id');
    await expect(appointment.provider_id).toBe('provider-id');
  });
  it('should not be able to create a new appointment on the same time', async () => {
    const appointmentDate = new Date(2021, 4, 10, 11);
    await createAppointmentService.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    });
    await expect(createAppointmentService.execute({
      date: appointmentDate,
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 12).getTime());
    await expect(createAppointmentService.execute({
      date: new Date(2021, 4, 10, 11),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 12).getTime());
    await expect(createAppointmentService.execute({
      date: new Date(2021, 4, 10, 13),
      user_id: 'user-provider-id',
      provider_id: 'user-provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => new Date(2021, 4, 10, 12).getTime());
    await expect(createAppointmentService.execute({
      date: new Date(2021, 4, 11, 7),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
    await expect(createAppointmentService.execute({
      date: new Date(2021, 4, 11, 18),
      user_id: 'user-id',
      provider_id: 'provider-id'
    })).rejects.toBeInstanceOf(_AppError.default);
  });
});