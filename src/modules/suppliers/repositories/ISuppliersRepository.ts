import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ICreateSupplierDTO from '../dtos/ICreateSupplierDTO';

export default interface ISuppliersRepository {
  create(data: ICreateSupplierDTO): Promise<Supplier>;
  findAll(): Promise<Supplier[]>;
  findByID(id: string): Promise<Supplier | undefined>;
  findByIDHubspot(id_hubspot: string): Promise<Supplier | undefined>;
  save(supplier: Supplier): Promise<Supplier>;
}
