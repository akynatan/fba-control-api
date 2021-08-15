/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('storage_fee')
export default class StorageFee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  asin: string;

  @Column()
  fnsku: string;

  @Column()
  product_name: string;

  @Column()
  fulfillment_center: string;

  @Column()
  country_code: string;

  @Column('decimal', { precision: 5, scale: 2 })
  longest_side: number;

  @Column('decimal', { precision: 5, scale: 2 })
  median_side: number;

  @Column('decimal', { precision: 5, scale: 2 })
  shortest_side: number;

  @Column()
  measurement_units: string;

  @Column('decimal', { precision: 5, scale: 2 })
  weight: number;

  @Column()
  weight_units: string;

  @Column('decimal', { precision: 5, scale: 2 })
  item_volume: number;

  @Column()
  volume_units: string;

  @Column()
  product_size_tier: string;

  @Column('decimal', { precision: 5, scale: 2 })
  average_quantity_on_hand: number;

  @Column('decimal', { precision: 5, scale: 2 })
  average_quantity_pending_removal: number;

  @Column('decimal', { precision: 5, scale: 2 })
  estimated_total_item_volume: number;

  @Column()
  month_of_charge: string;

  @Column('decimal', { precision: 5, scale: 2 })
  storage_rate: number;

  @Column()
  currency: string;

  @Column('decimal', { precision: 5, scale: 2 })
  estimated_monthly_storage_fee: number;

  @Column()
  dangerous_goods_storage_type: string;

  @Column()
  eligible_for_inventory_discount: string;

  @Column()
  qualifies_for_inventory_discount: string;

  @Column()
  average_quantity_customer_orders: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
