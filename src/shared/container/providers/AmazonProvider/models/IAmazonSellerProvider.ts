import IFeesEstimateProductByAsinAndBuyBox from '../dtos/IFeesEstimateProductByAsinAndBuyBox';
import IGetDataProductAmazonDTO from '../dtos/IGetDataProductAmazonDTO';
import IShipmentByShipmentID from '../dtos/IShipmentByShipmentID';
import IItemsByShipment from '../dtos/IItemsByShipment';
import IStatusShipment from '../dtos/IStatusShipment';
import IGetMyFees from '../dtos/IGetMyFees';
import IPrepInstructionsList from '../dtos/IPrepInstructionsList';
import IAllShipments from '../dtos/IAllShipments';

export default interface IAmazonSellerProvider {
  getMyFeesEstimate({
    buy_box,
    asin,
  }: IGetMyFees): Promise<IFeesEstimateProductByAsinAndBuyBox>;
  getDataProduct(sku: string): Promise<IGetDataProductAmazonDTO>;
  getShipment(shipment_id: string): Promise<IShipmentByShipmentID>;
  getAllShipments(): Promise<IAllShipments>;
  getItemsByShipment(shipment_id: string): Promise<IItemsByShipment>;
  getStatusByShipment(shipment_id: string): Promise<IStatusShipment>;
  getPrepInstructions(asin_list: string[]): Promise<IPrepInstructionsList>;
}
