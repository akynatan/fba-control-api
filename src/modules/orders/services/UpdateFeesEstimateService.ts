import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IProductsOrderRepository from '../repositories/IProductsOrderRepository';
import ProductsOrder from '../infra/typeorm/entities/ProductsOrder';

interface IRequest {
  product_order_id: string;
  asin: string;
  buy_box: number;
}

@injectable()
export default class UpdateFeesEstimateService {
  constructor(
    @inject('ProductsOrderRepository')
    private productsOrderRepository: IProductsOrderRepository,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({
    asin,
    buy_box,
    product_order_id,
  }: IRequest): Promise<ProductsOrder> {
    const product_order = await this.productsOrderRepository.findByID(
      product_order_id,
    );

    if (!product_order) {
      throw new AppError('Product order not found');
    }

    const fees = await this.amazonSellerProvider.getMyFeesEstimate({
      asin,
      buy_box,
    });

    product_order.buy_box = buy_box;
    if (fees.FeesEstimateResult) {
      product_order.amazon_fee =
        fees.FeesEstimateResult.FeesEstimate.TotalFeesEstimate.Amount;
    }

    await this.productsOrderRepository.save(product_order);

    return product_order;
  }
}
