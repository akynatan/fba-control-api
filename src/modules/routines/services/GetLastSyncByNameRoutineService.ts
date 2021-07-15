import { injectable, inject } from 'tsyringe';

import LogRoutine from '../infra/typeorm/entities/LogRoutine';
import ILogRoutineRepository from '../repositories/ILogRoutineRepository';

import ICreateLogRoutineDTO from '../dtos/ICreateLogRoutineDTO';

@injectable()
export default class GetLastSyncByNameRoutineService {
  constructor(
    @inject('LogRoutineRepository')
    private logRoutineRepository: ILogRoutineRepository,
  ) {}

  public async execute({
    name_routine,
  }: ICreateLogRoutineDTO): Promise<LogRoutine | undefined> {
    const log_routine = await this.logRoutineRepository.lastSyncByNameRoutine(
      name_routine,
    );

    return log_routine;
  }
}
