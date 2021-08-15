export default interface ICreateBackOrderDTO {
  product_supplier_id: string;
  qtd: number;
  unit_price: number;
  eta: number;
  buy_box: number;
  estimate_profit: number;
  note: string;
}
