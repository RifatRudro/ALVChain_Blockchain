import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateLiabilitiesTable1710961687001 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
        name: "liabilities",
        columns: [
            {
                name: "id",
                type: "int",
                isPrimary: true,
                isGenerated: true,
                generationStrategy: "increment",
            },
            {
                name: "user_asset_mapping_id",
                type: "int",
                isNullable: true,
            },
            {
                name:"status",
                type:"boolean",
                default:true //! true means currently in use
            },
            {
                name: "created_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
            },
            {
                name: "updated_at",
                type: "timestamp",
                default: "CURRENT_TIMESTAMP",
            },
        ]
    }));
}

public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("liabilities");
}
}
