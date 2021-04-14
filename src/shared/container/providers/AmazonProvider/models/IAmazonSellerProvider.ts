import IGetDataProductAmazonDTO from '../dtos/IGetDataProductAmazonDTO';

export default interface IAmazonSellerProvider {
  getMyFeesEstimate(): Promise<any>;
  getDataProduct(sku: string): Promise<IGetDataProductAmazonDTO>;
}
