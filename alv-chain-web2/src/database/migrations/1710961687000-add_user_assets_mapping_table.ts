import { MigrationInterface, QueryRunner, Table, TableColumn } from "typeorm";

export class AddUserLoanMappingTable1710961687000
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "user_asset_mapping",
        columns: [
          new TableColumn({
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          }),
          new TableColumn({
            name: "user_id",
            type: "int",
          }),
          new TableColumn({
            name: "asset_type",
            type: "int",
          }),
          new TableColumn({
            name: "document_id",
            type: "int",
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
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("user_asset_mapping");
  }
}
