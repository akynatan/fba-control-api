import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';

interface IRequest {
  email: string;
}

@injectable()
export default class GetMyFeesEstimateService {
  constructor(
    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute(): Promise<any> {
    const fees = await this.amazonSellerProvider.GetMyFeesEstimate();
    return fees;
  }
}
