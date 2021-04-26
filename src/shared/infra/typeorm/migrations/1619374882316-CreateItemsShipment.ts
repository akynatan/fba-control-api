import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateItemsShipment1619374882316
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'item_shipment_order',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'shipment_order_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'sku',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'qtd_shipped',
            type: 'integer',
            isNullable: true,
            default: 0,
          },
          {
            name: 'qtd_received',
            type: 'integer',
            isNullable: true,
            default: 0,
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
        foreignKeys: [
          {
            name: 'ItemShipmentOrder',
            referencedTableName: 'shipment_order',
            referencedColumnNames: ['id'],
            columnNames: ['shipment_order_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('item_shipment_order');
  }
}
