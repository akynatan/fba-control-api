import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';

import AppError from '@shared/errors/AppError';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';
import IOrdersRepository from '../repositories/IOrdersRepository';
import ICreateProductsOrderDTO from '../dtos/ICreateProductsOrderDTO';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';

interface ICreateProductsOrderServiceDTO {
  product_id: string;
  order_id: string;
  unit_price?: number;
  qtd?: number;
}

@injectable()
export default class CreateProductsOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,

    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    product_id,
    order_id,
    unit_price,
    qtd,
  }: ICreateProductsOrderServiceDTO): Promise<ProductsOrder | undefined> {
    const order = await this.ordersRepository.findByID(order_id);

    if (!order) {
      throw new AppError('Order not found');
    }

    let product_supplier = await this.productSupplierRepository.findBySupplierProduct(
      {
        product_id,
        supplier_id: order.supplier_id,
      },
    );

    if (!product_supplier) {
      product_supplier = await this.productSupplierRepository.create({
        product_id,
        supplier_id: order.supplier_id,
      });
    }

    const product_order = await this.productsOrderRepository.create({
      product_supplier_id: product_supplier.id,
      unit_price,
      qtd,
      order_id,
    });

    const product_order_response = await this.productsOrderRepository.findByID(
      product_order.id,
    );

    return product_order_response;
  }
}
