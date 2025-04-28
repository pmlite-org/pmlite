import { Injectable } from "@nestjs/common";
import { Mapper } from "@automapper/core";
import { InjectMapper } from "@automapper/nestjs";
import { TaskEntity } from "../entities/task.entity";
import { TasksRepositoryImpl } from "../repositories/tasks.repository";
import { TaskModel } from "../models/task.model";

@Injectable()
export class TasksService {
  constructor(
    private readonly taskRepository: TasksRepositoryImpl,
    @InjectMapper() private readonly mapper: Mapper
  ) {}

  async find(): Promise<TaskModel[]> {
    const taskEntities = await this.taskRepository.find();
    return this.mapper.mapArray(taskEntities, TaskEntity, TaskModel);
  }

  async bulkUpsert(taskModels: TaskModel[]): Promise<TaskModel[]> {
    console.log(taskModels);
    const taskEntities = this.mapper.mapArray(
      taskModels,
      TaskModel,
      TaskEntity
    );
    const taskEntitiesUpserted = await this.taskRepository.bulkUpsert(
      taskEntities
    );
    console.log(taskEntitiesUpserted);
    const taskModelsUpserted = this.mapper.mapArray(
      taskEntitiesUpserted,
      TaskEntity,
      TaskModel
    );
    console.log(taskModelsUpserted);
    return taskModelsUpserted;
  }

  async bulkDelete(uuids: string[]): Promise<void> {
    await this.taskRepository.bulkDelete(uuids);
  }
}
