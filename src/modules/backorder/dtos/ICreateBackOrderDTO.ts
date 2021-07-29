export default interface ICreateBackOrderDTO {
  supplier_id: number;
  product_id: number;
  qtd: number;
  unit_price: number;
  eta: number;
  buy_box: number;
  estimate_profit: number;
  note: string;
}
