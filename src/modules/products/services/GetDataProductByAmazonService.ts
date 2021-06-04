import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';

@injectable()
export default class GetDataProductByAmazonService {
  constructor(
    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute(sku: string): Promise<any> {
    const product = await this.amazonSellerProvider.getDataProduct(sku);
    return product;
  }
}
