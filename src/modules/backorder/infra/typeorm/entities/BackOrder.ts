/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('backorder')
export default class BackOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  supplier_id: number;

  @Column('decimal', { precision: 5, scale: 2 })
  product_id: number;

  @Column()
  qtd: number;

  @Column('decimal', { precision: 5, scale: 2 })
  unit_price: number;

  @Column('decimal', { precision: 5, scale: 2 })
  eta: number;

  @Column('decimal', { precision: 5, scale: 2 })
  buy_box: number;

  @Column('decimal', { precision: 5, scale: 2 })
  estimate_profit: number;

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
