import ICreateProductDTO from '../dtos/ICreateProductDTO';
import Product from '../infra/typeorm/entities/Product';

export default interface IProductsRepository {
  create(data: Omit<ICreateProductDTO, 'suppliers'>): Promise<Product>;
  save(user: Product): Promise<Product>;
  findByID(id: string): Promise<Product | undefined>;
  findByASIN(asin: string): Promise<Product[]>;
  findBySKU(asin: string): Promise<Product[]>;
  findAll(): Promise<Product[]>;
  delete(id: string): Promise<void>;
}
