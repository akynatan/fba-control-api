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
import ItemShipmentOrder from './ItemShipmentOrder';

import Order from '../../../../orders/infra/typeorm/entities/Order';

@Entity('shipment_order')
export default class ShipmentOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  order_id: string;

  @OneToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  shipment_id: string;

  @Column('decimal', { precision: 5, scale: 2 })
  cost: number;

  @Column()
  status: string;

  @Column()
  items: string;

  @Column()
  note: string;

  @OneToMany(() => ItemShipmentOrder, item_shipment => item_shipment.shipment)
  items_shipment: ItemShipmentOrder[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
