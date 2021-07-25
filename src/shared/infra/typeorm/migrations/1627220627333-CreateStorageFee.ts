import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateStorageFee1627220627333
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'storage_fee',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },

          {
            name: 'asin',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fnsku',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'product_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'fulfillment_center',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'country_code',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'longest_side',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'median_side',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'shortest_side',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'measurement_units',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'weight',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'weight_units',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'item_volume',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'volume_units',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'product_size_tier',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'average_quantity_on_hand',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'average_quantity_pending_removal',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'estimated_total_item_volume',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'month_of_charge',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'storage_rate',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'currency',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'estimated_monthly_storage_fee',
            type: 'real',
            isNullable: true,
            default: 0,
          },
          {
            name: 'dangerous_goods_storage_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'eligible_for_inventory_discount',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qualifies_for_inventory_discount',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'average_quantity_customer_orders',
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
    await queryRunner.dropTable('storage_fee');
  }
}
