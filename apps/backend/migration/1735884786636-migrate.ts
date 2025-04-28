import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrate1735884786636 implements MigrationInterface {
    name = 'Migrate1735884786636'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "task" ("uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "rank" integer NOT NULL, "task_id" character varying, "team" character varying, "epic_id" character varying, "name" character varying, "type" character varying, "task_type" character varying, "status" character varying, "priority" character varying, "planned_person_day" double precision, "planned_start_date" TIMESTAMP WITH TIME ZONE, "planned_end_date" TIMESTAMP WITH TIME ZONE, "actual_person_day" double precision, "actual_start_date" TIMESTAMP, "actual_end_date" TIMESTAMP, "assignee_id" character varying, "reporter_id" character varying, "description" character varying, "blocked_by" character varying, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_986727ffa05fc30a14022691831" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "task"`);
    }

}
