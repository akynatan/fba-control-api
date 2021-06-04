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

import ShipmentOrder from './ShipmentOrder';

@Entity('item_shipment_order')
export default class ItemShipmentOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  sku: string;

  @Column()
  shipment_order_id: string;

  @OneToOne(() => ShipmentOrder)
  @JoinColumn({ name: 'shipment_order_id' })
  shipment: ShipmentOrder;

  @Column()
  qtd_shipped: number;

  @Column()
  qtd_received: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
