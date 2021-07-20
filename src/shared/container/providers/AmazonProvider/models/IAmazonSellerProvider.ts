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

export default interface IAmazonSellerProvider {
  getMyFeesEstimate({
    buy_box,
    asin,
  }: IGetMyFees): Promise<IFeesEstimateProductByAsinAndBuyBox>;
  getDataProduct(sku: string): Promise<IGetDataProductAmazonDTO>;
  getShipment(shipment_id: string): Promise<IShipmentByShipmentID>;
  getAllShipments({
    date_init,
    date_finally,
  }: IParamsGetAllShipments): Promise<IAllShipments>;
  createReport({ name_report }: IParamsCreateReportInAmazon): Promise<any>;
  downloadReport(report_id: string): Promise<any>;
  getStatusReport(report_id: string): Promise<IResponseGetStatusReport>;
  getInventorySummaries({
    start_date,
  }: IGetProductsUpdated): Promise<IResponseGetProductsUpdated>;
  getItemsByShipment(shipment_id: string): Promise<IItemsByShipment>;
  getStatusByShipment(shipment_id: string): Promise<IStatusShipment>;
  getPrepInstructions(asin_list: string[]): Promise<IPrepInstructionsList>;
}
