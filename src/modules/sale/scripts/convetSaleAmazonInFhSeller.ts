import ICreateSaleDTO from '../dtos/ICreateSaleDTO';

const convert = (saleAmazon: any): ICreateSaleDTO => {
  return {
    amazon_order_id: saleAmazon['amazon-order-id'],
    merchant_order_id: saleAmazon['merchant-order-id'],
    purchase_date: saleAmazon['purchase-date'],
    last_updated_date: saleAmazon['last-updated-date'],
    order_status: saleAmazon['order-status'],
    fulfillment_channel: saleAmazon['fulfillment-channel'],
    sales_channel: saleAmazon['sales-channel'],
    order_channel: saleAmazon['order-channel'],
    ship_service_level: saleAmazon['ship-service-level'],
    product_name: saleAmazon['product-name'],
    sku: saleAmazon.sku,
    asin: saleAmazon.asin,
    item_status: saleAmazon['item-status'],
    quantity: Number(saleAmazon.quantity),
    currency: saleAmazon.currency,
    item_price: Number(saleAmazon['item-price']),
    item_tax: Number(saleAmazon['item-tax']),
    shipping_price: Number(saleAmazon['shipping-price']),
    shipping_tax: Number(saleAmazon['shipping-tax']),
    gift_wrap_price: Number(saleAmazon['gift-wrap-price']),
    gift_wrap_tax: Number(saleAmazon['gift-wrap-tax']),
    item_promotion_discount: Number(saleAmazon['item-promotion-discount']),
    ship_promotion_discount: Number(saleAmazon['ship-promotion-discount']),
    ship_city: saleAmazon['ship-city'],
    ship_state: saleAmazon['ship-state'],
    ship_postal_code: saleAmazon['ship-postal-code'],
    ship_country: saleAmazon['ship-country'],
    promotion_ids: saleAmazon['promotion-ids'],
    is_business_order: saleAmazon['is-business-order'],
    purchase_order_number: saleAmazon['purchase-order-number'],
    price_designation: saleAmazon['price-designation'],
  };
};

export default convert;
