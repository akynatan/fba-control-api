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

import Order from './Order';

@Entity('files_orders')
export default class FilesOrders {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  name_file: string;

  @Column()
  name_file_original: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
