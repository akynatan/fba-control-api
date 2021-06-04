import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';

interface IRequest {
  asin: string;
  buy_box: number;
}

@injectable()
export default class GetMyFeesEstimateService {
  constructor(
    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute(): Promise<any> {
    const fees = await this.amazonSellerProvider.getMyFeesEstimate(
      100,
      'B07N973KFM',
    );

    return fees;
  }
}
