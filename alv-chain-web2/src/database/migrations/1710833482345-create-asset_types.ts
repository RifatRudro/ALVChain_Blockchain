import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class CreateAssetTypess1710833482345 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "asset_types",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),
          new TableColumn({
            name: "title",
            type: "varchar",
            isNullable: false,
          }),
          new TableColumn({
            name: "cf",
            type: "varchar",
            isNullable: true,
          }),//!collactoral value
          new TableColumn({
            name: "is_active",
            type: "boolean",
            isNullable: false,
            default: true,
          }),
          new TableColumn({
            name: "created_at",
            type: "timestamptz",
            default: "now()",
          }),
          new TableColumn({
            name: "updated_at",
            type: "timestamptz",
            default: "now()",
          }),

          new TableColumn({
            name: "created_by",
            type: "int",
            isNullable: true,
          }),

          new TableColumn({
            name: "updated_by",
            type: "int",
            isNullable: true,
          }),
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("asset_types");
  }
}
