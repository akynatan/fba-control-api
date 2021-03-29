import { injectable } from 'tsyringe';
import SellingPartnerAPI from 'amazon-sp-api';

import IAmazonSellerProvider from '../models/IAmazonSellerProvider';

@injectable()
class AmazonSellerProvider implements IAmazonSellerProvider {
  private client;

  constructor() {
    const sellingPartner = new SellingPartnerAPI({
      region: 'na',
      refresh_token:
        'Atzr|IwEBIKOlB0_tG9t2D44g0kheJbMUD9xIPRaBqQwEeaN7cWEa64q3LzpikK_0NV5UaLKyJZDveIcp8k4fDV1sTLHFUx3dmsoHp9s615FF2wU86OBUaSPcFmOvnhoy9HFjv9eD0yYcwatqcKdrJep4IO6iUdC425nWiZTQxn8D7Cs43ufEq8DKpKBmeL4uhofDTYChi0CwZX_nkssTIAlr0F1GKwNrGZDXaEqR3DGQQ8jC4E0R6kypkargyLeUXgnUVtbtgVzEEvd5R9MVFh8gFxtzJ8-YnQbEltiajQLlJr3PqhI4iT1GlzlToJvuYHfD2TiZqqo', // The refresh token of your app user
    });
    this.client = sellingPartner;
  }

  public async GetMyFeesEstimate(): Promise<any> {
    const res = await this.client.callAPI({
      operation: 'getMyFeesEstimateForASIN',
      path: {
        Asin: 'B07FFB647Q', // asin
      },
      body: {
        FeesEstimateRequest: {
          IsAmazonFulfilled: 'true',
          MarketplaceId: 'ATVPDKIKX0DER',
          PriceToEstimateFees: {
            ListingPrice: {
              Amount: 100.0, // amazon by box
              CurrencyCode: 'USD',
            },
          },
          Identifier: 2, // identifier
        },
      },
    });
    return res;
  }
}

// 100 preço de venda
// 70 pago por ele
// 19.9 taxa da amazon
// 11.10 de ganho

// porcentagem do ganho sobre preço da venda
// lucro sobre o preço de venda
// lucro sobre o COG

// lucro é
// preço da venda - COG - taxa da amazon

export default AmazonSellerProvider;
