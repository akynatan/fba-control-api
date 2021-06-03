/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';
import ShipmentOrder from './ShipmentOrder';
import ProductsOrder from './ProductsOrder';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  supplier_id: string;

  @OneToOne(() => Supplier)
  @JoinColumn({ name: 'supplier_id' })
  supplier?: Supplier;

  @OneToMany(() => ShipmentOrder, shipments => shipments.order)
  shipments: ShipmentOrder[];

  @Column()
  form_payment: string;

  @Column()
  invoice: string;

  @Column()
  its_paid: boolean;

  @Column()
  status: string;

  @Column('decimal', { precision: 5, scale: 2 })
  shipment_cost: number;

  @Column('decimal', { precision: 5, scale: 2 })
  other_cost: number;

  @Column('decimal', { precision: 5, scale: 2 })
  sub_total: number;

  @Column('decimal', { precision: 5, scale: 2 })
  total_charged: number;

  @OneToMany(() => ProductsOrder, product_order => product_order.order)
  products_order: ProductsOrder[];

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
