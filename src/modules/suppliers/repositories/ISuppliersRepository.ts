import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ICreateSupplierDTO from '../dtos/ICreateSupplierDTO';

export default interface ISuppliersRepository {
  create(data: ICreateSupplierDTO): Promise<Supplier>;
  findAll(): Promise<Supplier[]>;
}
