import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksService } from "../services/tasks.service";
import { TasksController } from "../controllers/tasks.controller";
import { TasksRepositoryImpl } from "../repositories/tasks.repository";
import { TaskEntity } from "../entities/task.entity";

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepositoryImpl],
})
export class TasksModule {}
