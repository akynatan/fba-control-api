import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSales1627252248684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'sale',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'amazon_order_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'merchant_order_id',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'purchase_date',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'last_updated_date',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'order_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fulfillment_channel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sales_channel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'order_channel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ship_service_level',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'product_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sku',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'asin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'item_status',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'quantity',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'currency',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'item_price',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'item_tax',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'shipping_price',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'shipping_tax',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'gift_wrap_price',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'gift_wrap_tax',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'item_promotion_discount',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'ship_promotion_discount',
            type: 'real',
            isNullable: true,
          },
          {
            name: 'ship_city',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ship_state',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ship_postal_code',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'ship_country',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'promotion_ids',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'is_business_order',
            type: 'varchar',
            isNullable: true,
          },

          {
            name: 'purchase_order_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'price_designation',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('sale');
  }
}
