import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateCogGrossAndShipAmazon1621783307268
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumns('product_order', [
      new TableColumn({
        name: 'cog',
        type: 'real',
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: 'gross_profit',
        type: 'real',
        isNullable: true,
        default: 0,
      }),
      new TableColumn({
        name: 'shipment_amazon',
        type: 'real',
        isNullable: true,
        default: 0,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('product_order', 'cog');
    await queryRunner.dropColumn('product_order', 'gross_profit');
    await queryRunner.dropColumn('product_order', 'shipment_amazon');
  }
}
