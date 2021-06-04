import IFeesEstimateProductByAsinAndBuyBox from '../dtos/IFeesEstimateProductByAsinAndBuyBox';
import IGetDataProductAmazonDTO from '../dtos/IGetDataProductAmazonDTO';
import IShipmentByShipmentID from '../dtos/IShipmentByShipmentID';
import IItemsByShipment from '../dtos/IItemsByShipment';
import IStatusShipment from '../dtos/IStatusShipment';
import IGetMyFees from '../dtos/IGetMyFees';

export default interface IAmazonSellerProvider {
  getMyFeesEstimate({
    buy_box,
    asin,
  }: IGetMyFees): Promise<IFeesEstimateProductByAsinAndBuyBox>;
  getDataProduct(sku: string): Promise<IGetDataProductAmazonDTO>;
  getShipment(shipment_id: string): Promise<IShipmentByShipmentID>;
  getItemsByShipment(shipment_id: string): Promise<IItemsByShipment>;
  getStatusByShipment(shipment_id: string): Promise<IStatusShipment>;
}
