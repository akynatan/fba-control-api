export default interface ICreateShipmentOrderDTO {
  order_id?: string;
  shipment_id: string;
  note?: string;
  cost?: number;
  status?: string;
}
