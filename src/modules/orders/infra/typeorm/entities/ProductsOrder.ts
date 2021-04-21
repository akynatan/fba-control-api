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

import ProductSupplier from '@modules/products/infra/typeorm/entities/ProductSupplier';

@Entity('product_supplier_order')
export default class ProductsOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_supplier_id: string;

  @OneToOne(() => ProductSupplier)
  @JoinColumn({ name: 'product_supplier_id' })
  product_supplier: ProductSupplier;

  @Column()
  order_id: string;

  @Column()
  unit_price: number;

  @Column()
  qtd: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
