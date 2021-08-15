/* eslint-disable camelcase */
import ProductSupplier from '@modules/products/infra/typeorm/entities/ProductSupplier';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('backorder')
export default class BackOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_supplier_id: string;

  @OneToOne(() => ProductSupplier)
  @JoinColumn({ name: 'product_supplier_id' })
  product_supplier: ProductSupplier;

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
