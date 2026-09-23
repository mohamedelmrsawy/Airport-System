import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1790172128068 implements MigrationInterface {
    name = 'Initial1790172128068'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger" ADD "email" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "passenger" DROP COLUMN "email"`);
    }

}
