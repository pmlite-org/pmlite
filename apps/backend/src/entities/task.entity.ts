import { AutoMap } from "@automapper/classes";
import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("task")
export class TaskEntity {
  @PrimaryGeneratedColumn("uuid", { name: "uuid" })
  @AutoMap()
  uuid?: string | null;

  @Column({ nullable: false, name: "rank" })
  @AutoMap()
  rank: number;

  @Column({ nullable: true, name: "task_id" })
  @AutoMap()
  taskId?: string | null;

  @Column({ nullable: true, name: "team" })
  @AutoMap()
  team?: string | null;

  @Column({ nullable: true, name: "epic_id" })
  @AutoMap()
  epicId?: string | null;

  @Column({ nullable: true, name: "name" })
  @AutoMap()
  name?: string | null;

  @Column({ nullable: true, name: "type" })
  @AutoMap()
  type?: string | null;

  @Column({ nullable: true, name: "task_type" })
  @AutoMap()
  taskType?: string | null;

  @Column({ nullable: true, name: "status" })
  @AutoMap()
  status?: string | null;

  @Column({ nullable: true, name: "priority" })
  @AutoMap()
  priority?: string | null;

  @Column({ type: "float", nullable: true, name: "planned_person_day" })
  @AutoMap()
  plannedPersonDay?: number | null;

  @Column({ type: "timestamptz", nullable: true, name: "planned_start_date" })
  @AutoMap()
  plannedStartDate?: Date | null;

  @Column({ type: "timestamptz", nullable: true, name: "planned_end_date" })
  @AutoMap()
  plannedEndDate?: Date | null;

  @Column({ type: "float", nullable: true, name: "actual_person_day" })
  @AutoMap()
  actualPersonDay?: number | null;

  @Column({ nullable: true, name: "actual_start_date" })
  @AutoMap()
  actualStartDate?: Date | null;

  @Column({ nullable: true, name: "actual_end_date" })
  @AutoMap()
  actualEndDate?: Date | null;

  @Column({ nullable: true, name: "assignee_id" })
  @AutoMap()
  assigneeId?: string | null;

  @Column({ nullable: true, name: "reporter_id" })
  @AutoMap()
  reporterId?: string | null;

  @Column({ nullable: true, name: "description" })
  @AutoMap()
  description?: string | null;

  @Column({ nullable: true, name: "blocked_by" })
  @AutoMap()
  blockedBy?: string | null;

  @Column({
    type: "timestamptz",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt?: Date;

  @Column({
    type: "timestamptz",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt?: Date;
}
