import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  create(data: Omit<ICreateProductDTO, 'suppliers'>): Promise<Product>;
  save(user: Product): Promise<Product>;
  findByID(id: string): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
}
