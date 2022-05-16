import {MigrationInterface, QueryRunner} from "typeorm";

export class bcc21652693337817 implements MigrationInterface {
    name = 'bcc21652693337817'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "logs" ("uid" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "ip" varchar NOT NULL, "date" date NOT NULL, "using_browser" varchar NOT NULL, "is_successful" boolean NOT NULL, "req_body" varchar(2000), "usingFuncId" integer)`);
        await queryRunner.query(`CREATE TABLE "funcHelper" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "desciption" varchar NOT NULL, "path" varchar NOT NULL, "method" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "regex_entity" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "regexCondition" varchar NOT NULL, "regexSubst" varchar NOT NULL, "regexNewSubst" varchar NOT NULL, "flasg" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Pods" ("uid" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "status" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Providers" ("uid" varchar PRIMARY KEY NOT NULL, "operator" varchar NOT NULL, "description" varchar NOT NULL, "code" varchar NOT NULL, "status" boolean NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "Route" ("uid" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "priority" integer NOT NULL, "code_provider_id" integer)`);
        await queryRunner.query(`CREATE TABLE "templates" ("uid" varchar PRIMARY KEY NOT NULL, "condition" varchar NOT NULL, "subString" varchar NOT NULL, "newSubString" varchar NOT NULL, "flags" varchar NOT NULL)`);
        await queryRunner.query(`CREATE TABLE "temporary_logs" ("uid" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "ip" varchar NOT NULL, "date" date NOT NULL, "using_browser" varchar NOT NULL, "is_successful" boolean NOT NULL, "req_body" varchar(2000), "usingFuncId" integer, CONSTRAINT "FK_5d8a29875c12e374a4ffe83dae3" FOREIGN KEY ("usingFuncId") REFERENCES "funcHelper" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_logs"("uid", "username", "ip", "date", "using_browser", "is_successful", "req_body", "usingFuncId") SELECT "uid", "username", "ip", "date", "using_browser", "is_successful", "req_body", "usingFuncId" FROM "logs"`);
        await queryRunner.query(`DROP TABLE "logs"`);
        await queryRunner.query(`ALTER TABLE "temporary_logs" RENAME TO "logs"`);
        await queryRunner.query(`CREATE TABLE "temporary_Route" ("uid" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "priority" integer NOT NULL, "code_provider_id" integer, CONSTRAINT "FK_c5676f02f1feddf56ac11616146" FOREIGN KEY ("code_provider_id") REFERENCES "Providers" ("uid") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_Route"("uid", "code", "priority", "code_provider_id") SELECT "uid", "code", "priority", "code_provider_id" FROM "Route"`);
        await queryRunner.query(`DROP TABLE "Route"`);
        await queryRunner.query(`ALTER TABLE "temporary_Route" RENAME TO "Route"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Route" RENAME TO "temporary_Route"`);
        await queryRunner.query(`CREATE TABLE "Route" ("uid" varchar PRIMARY KEY NOT NULL, "code" varchar NOT NULL, "priority" integer NOT NULL, "code_provider_id" integer)`);
        await queryRunner.query(`INSERT INTO "Route"("uid", "code", "priority", "code_provider_id") SELECT "uid", "code", "priority", "code_provider_id" FROM "temporary_Route"`);
        await queryRunner.query(`DROP TABLE "temporary_Route"`);
        await queryRunner.query(`ALTER TABLE "logs" RENAME TO "temporary_logs"`);
        await queryRunner.query(`CREATE TABLE "logs" ("uid" varchar PRIMARY KEY NOT NULL, "username" varchar NOT NULL, "ip" varchar NOT NULL, "date" date NOT NULL, "using_browser" varchar NOT NULL, "is_successful" boolean NOT NULL, "req_body" varchar(2000), "usingFuncId" integer)`);
        await queryRunner.query(`INSERT INTO "logs"("uid", "username", "ip", "date", "using_browser", "is_successful", "req_body", "usingFuncId") SELECT "uid", "username", "ip", "date", "using_browser", "is_successful", "req_body", "usingFuncId" FROM "temporary_logs"`);
        await queryRunner.query(`DROP TABLE "temporary_logs"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP TABLE "Route"`);
        await queryRunner.query(`DROP TABLE "Providers"`);
        await queryRunner.query(`DROP TABLE "Pods"`);
        await queryRunner.query(`DROP TABLE "regex_entity"`);
        await queryRunner.query(`DROP TABLE "funcHelper"`);
        await queryRunner.query(`DROP TABLE "logs"`);
    }

}
