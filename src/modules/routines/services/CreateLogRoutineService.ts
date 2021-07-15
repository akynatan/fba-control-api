import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import LogRoutine from '../infra/typeorm/entities/LogRoutine';
import ILogRoutineRepository from '../repositories/ILogRoutineRepository';

import ICreateLogRoutineDTO from '../dtos/ICreateLogRoutineDTO';

@injectable()
export default class CreateLogRoutineService {
  constructor(
    @inject('LogRoutineRepository')
    private logRoutineRepository: ILogRoutineRepository,
  ) {}

  public async execute({
    name_routine,
  }: ICreateLogRoutineDTO): Promise<LogRoutine> {
    if (!name_routine) {
      throw new AppError('Name is missing!');
    }

    const log_routine = await this.logRoutineRepository.create({
      name_routine,
    });

    return log_routine;
  }
}
