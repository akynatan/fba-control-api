export default interface ICreateItemShipmentOrderDTO {
  sku: string;
  qtd_shipped: number;
  qtd_received: number;
  shipment_order_id: string;
}
