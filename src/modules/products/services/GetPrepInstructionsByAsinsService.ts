import { injectable, inject } from 'tsyringe';

import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import IAmazonSellerProvider from '@shared/container/providers/AmazonProvider/models/IAmazonSellerProvider';
import IPrepInstructionsList from '@shared/container/providers/AmazonProvider/dtos/IPrepInstructionsList';

interface IRequest {
  asin_list: string[];
}

@injectable()
export default class GetPrepInstructionsByAsinsService {
  constructor(
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider,

    @inject('AmazonSellerProvider')
    private amazonSellerProvider: IAmazonSellerProvider,
  ) {}

  public async execute({
    asin_list,
  }: IRequest): Promise<IPrepInstructionsList> {
    const cacheKey = `${asin_list.sort().join('|')}`;

    let preps = await this.cacheProvider.recover<IPrepInstructionsList>(
      cacheKey,
    );

    if (!preps) {
      preps = await this.amazonSellerProvider.getPrepInstructions(asin_list);
      await this.cacheProvider.save(cacheKey, preps);
    }

    return preps;
  }
}
