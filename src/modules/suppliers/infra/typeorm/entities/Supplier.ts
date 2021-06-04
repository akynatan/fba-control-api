/* eslint-disable camelcase */
import ProductSupplier from '@modules/products/infra/typeorm/entities/ProductSupplier';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

@Entity('suppliers')
export default class Supplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name?: string;

  @Column()
  note?: string;

  @Column()
  id_hubspot?: number;

  @Column()
  tel?: string;

  @Column()
  mail?: string;

  @Column()
  domain?: string;

  @Column()
  status_hubspot?: string;

  @Column()
  created_at_hubspot?: Date;

  @Column()
  updated_at_hubspot?: Date;

  @OneToMany(
    () => ProductSupplier,
    product_supplier => product_supplier.suppliers,
  )
  product_suppliers: ProductSupplier[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
