/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('sale')
export default class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  amazon_order_id: string;

  @Column()
  merchant_order_id: string;

  @Column()
  purchase_date: string;

  @Column()
  last_updated_date: string;

  @Column()
  order_status: string;

  @Column()
  fulfillment_channel: string;

  @Column()
  sales_channel: string;

  @Column()
  order_channel: string;

  @Column()
  ship_service_level: string;

  @Column()
  product_name: string;

  @Column()
  sku: string;

  @Column()
  asin: string;

  @Column()
  item_status: string;

  @Column()
  quantity: number;

  @Column()
  currency: string;

  @Column('decimal', { precision: 5, scale: 2 })
  item_price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  item_tax: number;

  @Column('decimal', { precision: 5, scale: 2 })
  shipping_price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  shipping_tax: number;

  @Column('decimal', { precision: 5, scale: 2 })
  gift_wrap_price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  gift_wrap_tax: number;

  @Column('decimal', { precision: 5, scale: 2 })
  item_promotion_discount: number;

  @Column('decimal', { precision: 5, scale: 2 })
  ship_promotion_discount: number;

  @Column()
  ship_city: string;

  @Column()
  ship_state: string;

  @Column()
  ship_postal_code: string;

  @Column()
  ship_country: string;

  @Column()
  promotion_ids: string;

  @Column()
  is_business_order: string;

  @Column()
  purchase_order_number: string;

  @Column()
  price_designation: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
