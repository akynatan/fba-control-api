import { injectable } from 'tsyringe';
import SellingPartnerAPI from 'amazon-sp-api';

import IAmazonSellerProvider from '../models/IAmazonSellerProvider';
import IFeesEstimateProductByAsinAndBuyBox from '../dtos/IFeesEstimateProductByAsinAndBuyBox';
import IGetDataProductAmazonDTO from '../dtos/IGetDataProductAmazonDTO';
import IShipmentByShipmentID from '../dtos/IShipmentByShipmentID';
import IItemsByShipment from '../dtos/IItemsByShipment';
import IStatusShipment from '../dtos/IStatusShipment';
import IGetMyFees from '../dtos/IGetMyFees';
import IPrepInstructionsList from '../dtos/IPrepInstructionsList';
import IAllShipments from '../dtos/IAllShipments';
import IParamsGetAllShipments from '../dtos/IParamsGetAllShipments';
import IGetProductsUpdated from '../dtos/IGetProductsUpdated';
import IResponseGetProductsUpdated from '../dtos/IResponseGetProductsUpdated';
import IParamsCreateReportInAmazon from '../dtos/IParamsCreateReportInAmazon';
import IResponseGetStatusReport from '../dtos/IResponseGetStatusReport';

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

  public async getMyFeesEstimate({
    buy_box,
    asin,
  }: IGetMyFees): Promise<IFeesEstimateProductByAsinAndBuyBox> {
    const res = await this.client.callAPI({
      operation: 'getMyFeesEstimateForASIN',
      path: {
        // Asin: 'B07FFB647Q', // asin
        Asin: asin, // asin
      },
      body: {
        FeesEstimateRequest: {
          IsAmazonFulfilled: 'true',
          MarketplaceId: 'ATVPDKIKX0DER',
          PriceToEstimateFees: {
            ListingPrice: {
              // Amount: 100.0, // amazon by box
              Amount: buy_box, // amazon by box
              CurrencyCode: 'USD',
            },
          },
          Identifier: 2, // identifier
        },
      },
    });
    return res;
  }

  public async getDataProduct(sku: string): Promise<IGetDataProductAmazonDTO> {
    const res = await this.client.callAPI({
      operation: 'listCatalogItems',
      query: {
        MarketplaceId: 'ATVPDKIKX0DER',
        SellerSKU: sku,
      },
    });
    return res;
  }

  public async createReport({
    name_report,
  }: IParamsCreateReportInAmazon): Promise<any> {
    const res = await this.client.callAPI({
      operation: 'createReport',
      body: {
        marketplaceIds: ['ATVPDKIKX0DER'],
        reportType: name_report,
      },
    });
    return res;
  }

  public async getShipment(
    shipment_id: string,
  ): Promise<IShipmentByShipmentID> {
    try {
      const res = await this.client.callAPI({
        operation: 'getTransportDetails',
        path: {
          shipmentId: shipment_id,
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      return {} as IShipmentByShipmentID;
    }
  }

  public async downloadReport(report_document_id: string): Promise<any> {
    try {
      const report_document = await this.client.callAPI({
        operation: 'getReportDocument',
        path: {
          reportDocumentId: report_document_id,
        },
      });

      const report = await this.client.download(report_document, {
        json: true,
        file: './report-storage-fee.json',
      });

      return report;
    } catch (err) {
      console.log(err);
      return err as any;
    }
  }

  public async getStatusReport(
    report_id: string,
  ): Promise<IResponseGetStatusReport> {
    try {
      const res = await this.client.callAPI({
        operation: 'getReport',
        path: {
          reportId: report_id,
        },
      });

      return res;
    } catch (err) {
      return {} as IResponseGetStatusReport;
    }
  }

  public async getAllShipments({
    date_init,
    date_finally,
  }: IParamsGetAllShipments): Promise<IAllShipments> {
    try {
      const res = await this.client.callAPI({
        operation: 'getShipments',
        query: {
          MarketplaceId: 'ATVPDKIKX0DER',
          QueryType: 'DATE_RANGE',
          ShipmentStatusList: [
            'WORKING',
            'SHIPPED',
            'RECEIVING',
            'CLOSED',
            'IN_TRANSIT',
            'DELIVERED',
            'CHECKED_IN',
          ],
          LastUpdatedBefore: date_init,
          LastUpdatedAfter: date_finally,
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      return {} as IAllShipments;
    }
  }

  public async getInventorySummaries({
    start_date,
  }: IGetProductsUpdated): Promise<IResponseGetProductsUpdated> {
    try {
      const res = await this.client.callAPI({
        operation: 'getInventorySummaries',
        query: {
          marketplaceIds: ['ATVPDKIKX0DER'],
          startDateTime: start_date,
          granularityType: 'Marketplace',
          granularityId: 'ATVPDKIKX0DER',
          details: true,
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      return {} as IResponseGetProductsUpdated;
    }
  }

  public async getStatusByShipment(
    shipment_id: string,
  ): Promise<IStatusShipment> {
    try {
      const res = await this.client.callAPI({
        operation: 'getShipments',
        query: {
          MarketplaceId: 'ATVPDKIKX0DER',
          QueryType: 'SHIPMENT',
          ShipmentIdList: [shipment_id],
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      return {} as IStatusShipment;
    }
  }

  public async getItemsByShipment(
    shipment_id: string,
  ): Promise<IItemsByShipment> {
    try {
      const res = await this.client.callAPI({
        operation: 'getShipmentItemsByShipmentId',
        path: {
          shipmentId: shipment_id,
        },
        query: {
          MarketplaceId: 'ATVPDKIKX0DER',
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      return {} as IItemsByShipment;
    }
  }

  public async getPrepInstructions(
    asin_list: string[],
  ): Promise<IPrepInstructionsList> {
    try {
      const res = await this.client.callAPI({
        operation: 'getPrepInstructions',
        query: {
          ShipToCountryCode: 'US',
          ASINList: asin_list,
        },
      });
      return res;
    } catch (err) {
      console.log(err);
      return {} as IPrepInstructionsList;
    }
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
