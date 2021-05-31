import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateLabelAndPrepProduct1622334575065
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'label',
        type: 'varchar',
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      'products',
      new TableColumn({
        name: 'prep',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('products', 'label');
    await queryRunner.dropColumn('products', 'prep');
  }
}
