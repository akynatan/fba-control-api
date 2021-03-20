import ICreateProductSupplierDTO from '../dtos/ICreateProductSupplierDTO';
import ProductSupplier from '../infra/typeorm/entities/ProductSupplier';

export default interface IProductSupplierRepository {
  create(data: ICreateProductSupplierDTO): Promise<ProductSupplier>;
}
