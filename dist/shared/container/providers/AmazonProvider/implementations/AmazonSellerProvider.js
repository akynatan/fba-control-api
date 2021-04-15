"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tsyringe = require("tsyringe");

var _amazonSpApi = _interopRequireDefault(require("amazon-sp-api"));

var _dec, _dec2, _dec3, _class, _temp;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let AmazonSellerProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = (_temp = class AmazonSellerProvider {
  constructor() {
    this.client = void 0;
    const sellingPartner = new _amazonSpApi.default({
      region: 'na',
      refresh_token: 'Atzr|IwEBIKOlB0_tG9t2D44g0kheJbMUD9xIPRaBqQwEeaN7cWEa64q3LzpikK_0NV5UaLKyJZDveIcp8k4fDV1sTLHFUx3dmsoHp9s615FF2wU86OBUaSPcFmOvnhoy9HFjv9eD0yYcwatqcKdrJep4IO6iUdC425nWiZTQxn8D7Cs43ufEq8DKpKBmeL4uhofDTYChi0CwZX_nkssTIAlr0F1GKwNrGZDXaEqR3DGQQ8jC4E0R6kypkargyLeUXgnUVtbtgVzEEvd5R9MVFh8gFxtzJ8-YnQbEltiajQLlJr3PqhI4iT1GlzlToJvuYHfD2TiZqqo' // The refresh token of your app user

    });
    this.client = sellingPartner;
  }

  async getMyFeesEstimate() {
    const res = await this.client.callAPI({
      operation: 'getMyFeesEstimateForASIN',
      path: {
        Asin: 'B07FFB647Q' // asin

      },
      body: {
        FeesEstimateRequest: {
          IsAmazonFulfilled: 'true',
          MarketplaceId: 'ATVPDKIKX0DER',
          PriceToEstimateFees: {
            ListingPrice: {
              Amount: 100.0,
              // amazon by box
              CurrencyCode: 'USD'
            }
          },
          Identifier: 2 // identifier

        }
      }
    });
    return res;
  }

  async getDataProduct(sku) {
    const res = await this.client.callAPI({
      operation: 'listCatalogItems',
      query: {
        MarketplaceId: 'ATVPDKIKX0DER',
        SellerSKU: sku
      }
    });
    return res;
  }

}, _temp)) || _class) || _class) || _class); // 100 preço de venda
// 70 pago por ele
// 19.9 taxa da amazon
// 11.10 de ganho
// porcentagem do ganho sobre preço da venda
// lucro sobre o preço de venda
// lucro sobre o COG
// lucro é
// preço da venda - COG - taxa da amazon

var _default = AmazonSellerProvider;
exports.default = _default;