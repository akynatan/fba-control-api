/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import ProductSupplier from './ProductSupplier';

@Entity('products')
export default class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  sku: string;

  @Column()
  asin: string;

  @Column()
  upc: string;

  @Column()
  image: string;

  @Column()
  brand: string;

  @Column()
  note: string;

  @OneToMany(
    () => ProductSupplier,
    product_supplier => product_supplier.products,
  )
  product_suppliers: ProductSupplier[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
