import { getRepository, Repository } from 'typeorm';
import IProductsOrderRepository from '@modules/orders/repositories/IProductsOrderRepository';

import ICreateProductsOrderDTO from '@modules/orders/dtos/ICreateProductsOrderDTO';
import ProductsOrder from '../entities/ProductsOrder';

export default class ProductsOrderRepository
  implements IProductsOrderRepository {
  private ormRepository: Repository<ProductsOrder>;

  constructor() {
    this.ormRepository = getRepository(ProductsOrder);
  }

  public async save(product_order: ProductsOrder): Promise<ProductsOrder> {
    await this.ormRepository.save(product_order);
    return product_order;
  }

  public async create(
    productOrderData: ICreateProductsOrderDTO,
  ): Promise<ProductsOrder> {
    const product_order = this.ormRepository.create(productOrderData);
    await this.ormRepository.save(product_order);
    return product_order;
  }

  public async findAll(): Promise<ProductsOrder[]> {
    const products_order = await this.ormRepository.find({
      relations: ['product_supplier', 'product_supplier.products'],
    });
    return products_order;
  }

  public async findByID(id: string): Promise<ProductsOrder | undefined> {
    const products_order = await this.ormRepository.findOne(id, {
      relations: ['product_supplier', 'product_supplier.products'],
    });
    return products_order;
  }

  public async getProducts(order_id: string): Promise<ProductsOrder[]> {
    const products = await this.ormRepository.find({
      where: { order_id },
      relations: ['product_supplier', 'product_supplier.products'],
    });

    return products;
  }
}
