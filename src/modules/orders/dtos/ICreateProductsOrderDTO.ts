export default interface ICreateProductsOrderDTO {
  product_supplier_id: string;
  order_id: string;
  unit_price?: number;
  qtd?: number;
  label?: number;
  prep?: number;
  other_cost?: number;
  buy_box?: number;
  amazon_fee?: number;
  note: string;
}
