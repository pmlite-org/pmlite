import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";

import { TaskEntity } from "../entities/task.entity";

@Injectable()
export class TasksRepositoryImpl {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>
  ) {}

  async create(
    entity: TaskEntity,
    manager?: EntityManager
  ): Promise<TaskEntity> {
    return manager
      ? manager.getRepository(TaskEntity).save(entity)
      : this.taskRepository.save(entity);
  }

  async find(): Promise<TaskEntity[]> {
    return this.taskRepository.find({ order: { rank: "ASC" } });
  }

  async bulkUpsert(
    entities: TaskEntity[],
    manager?: EntityManager
  ): Promise<TaskEntity[]> {
    return manager
      ? manager.getRepository(TaskEntity).save(entities)
      : this.taskRepository.save(entities);
  }

  async bulkDelete(uuids: string[], manager?: EntityManager): Promise<void> {
    if (manager) {
      await manager.getRepository(TaskEntity).delete(uuids);
    } else {
      await this.taskRepository.delete(uuids);
    }
  }
}
