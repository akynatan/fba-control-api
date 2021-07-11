import { getRepository, Repository } from 'typeorm';
import ILogRoutineRepository from '@modules/routines/repositories/ILogRoutineRepository';
import ICreateLogRoutineDTO from '@modules/routines/dtos/ICreateLogRoutineDTO';

import LogRoutine from '../entities/LogRoutine';

export default class LogRoutineRepository implements ILogRoutineRepository {
  private ormRepository: Repository<LogRoutine>;

  constructor() {
    this.ormRepository = getRepository(LogRoutine);
  }

  public async findByNameRoutine(
    name_routine: string,
  ): Promise<LogRoutine | undefined> {
    const log_routine = await this.ormRepository.findOne({
      where: { name_routine },
    });

    return log_routine;
  }

  public async lastSyncByNameRoutine(
    name_routine: string,
  ): Promise<LogRoutine | undefined> {
    const log_routine = await this.ormRepository.findOne({
      order: {
        created_at: 'DESC',
      },
      where: { name_routine },
    });

    return log_routine;
  }

  public async create(
    logRoutineData: ICreateLogRoutineDTO,
  ): Promise<LogRoutine> {
    const log_routine = this.ormRepository.create(logRoutineData);
    await this.ormRepository.save(log_routine);
    return log_routine;
  }
}
