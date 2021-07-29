import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IProductSupplierRepository from '@modules/products/repositories/IProductSupplierRepository';
import BackOrder from '../infra/typeorm/entities/BackOrder';
import IBackOrderRepository from '../repositories/IBackOrderRepository';

interface IRequest {
  product_id: string;
  supplier_id: string;
  qtd: number;
  unit_price: number;
  eta: number;
  buy_box: number;
  estimate_profit: number;
  note: string;
}

@injectable()
export default class CreateBackOrderService {
  constructor(
    @inject('BackOrderRepository')
    private backOrderRepository: IBackOrderRepository,

    @inject('ProductSupplierRepository')
    private productSupplierRepository: IProductSupplierRepository,

    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,
  ) {}

  public async execute({
    buy_box,
    estimate_profit,
    eta,
    note,
    product_id,
    supplier_id,
    unit_price,
    qtd,
  }: IRequest): Promise<BackOrder> {
    let productSupplier = await this.productSupplierRepository.findBySupplierProduct(
      {
        product_id,
        supplier_id,
      },
    );

    if (!productSupplier) {
      productSupplier = await this.productSupplierRepository.create({
        product_id,
        supplier_id,
      });
    }

    const backorder = await this.backOrderRepository.create({
      buy_box,
      estimate_profit,
      eta,
      note,
      product_supplier_id: productSupplier.id,
      unit_price,
      qtd,
    });

    await this.cacheProvider.invalidatePrefix('all-backOrders-list');

    return backorder;
  }
}
