import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RemoveRestrictionDeleteOrderToShipmentAndFile1623446863476
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'files_orders',
      'OrderProductSupplierOrder',
    );

    await queryRunner.dropForeignKey(
      'shipment_order',
      'OrderProductSupplierOrder',
    );

    await queryRunner.createForeignKey(
      'files_orders',
      new TableForeignKey({
        name: 'FilesHasOrders',
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        columnNames: ['order_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'shipment_order',
      new TableForeignKey({
        name: 'ShipmentHasOrders',
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        columnNames: ['order_id'],
        onDelete: 'SET NULL',
        onUpdate: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('shipment_order', 'ShipmentHasOrders');
    await queryRunner.dropForeignKey('files_orders', 'FilesHasOrders');

    await queryRunner.createForeignKey(
      'files_orders',
      new TableForeignKey({
        name: 'FilesHasOrders',
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        columnNames: ['order_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );

    await queryRunner.createForeignKey(
      'shipment_order',
      new TableForeignKey({
        name: 'ShipmentHasOrders',
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        columnNames: ['order_id'],
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
      }),
    );
  }
}
