import ICreateShopDTO from '../dtos/ICreateLogRoutineDTO';
import LogRoutine from '../infra/typeorm/entities/LogRoutine';

export default interface ILogRoutineRepository {
  create(data: ICreateShopDTO): Promise<LogRoutine>;
  findByNameRoutine(name_routine: string): Promise<LogRoutine | undefined>;
  lastSyncByNameRoutine(name_routine: string): Promise<LogRoutine | undefined>;
}
