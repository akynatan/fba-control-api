export default interface ICreateStorageFeeDTO {
  asin: string;
  fnsku: string;
  product_name: string;
  fulfillment_center: string;
  country_code: string;
  longest_side: number;
  median_side: number;
  shortest_side: number;
  measurement_units: string;
  weight: number;
  weight_units: string;
  item_volume: number;
  volume_units: string;
  product_size_tier: string;
  average_quantity_on_hand: number;
  average_quantity_pending_removal: number;
  estimated_total_item_volume: number;
  month_of_charge: string;
  storage_rate: number;
  currency: string;
  estimated_monthly_storage_fee: number;
  dangerous_goods_storage_type: string;
  eligible_for_inventory_discount: string;
  qualifies_for_inventory_discount: string;
  average_quantity_customer_orders: string;
}
