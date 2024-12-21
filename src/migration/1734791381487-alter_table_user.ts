import { MigrationInterface, QueryRunner } from "typeorm";

export class AlterTableUser1734791381487 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE public.user
            ADD COLUMN address VARCHAR NOT NULL;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`
            ALTER TABLE public.user
                drop address;
        `);
    }

}
