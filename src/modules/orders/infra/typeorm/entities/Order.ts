/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import Supplier from '@modules/suppliers/infra/typeorm/entities/Supplier';

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

  @Column()
  form_payment: string;

  @Column()
  its_paid: boolean;

  @Column()
  status: string;

  @Column('decimal', { precision: 5, scale: 2 })
  shipment_cost: number;

  @Column('decimal', { precision: 5, scale: 2 })
  other_cost: number;

  @Column()
  note: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
