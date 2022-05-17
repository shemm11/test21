import {MigrationInterface, QueryRunner} from "typeorm";

export class test21651328204654 implements MigrationInterface {
    name = 'test21651328204654'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "logs" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "logs" ADD "date" character varying NOT NULL`);
    }

}
