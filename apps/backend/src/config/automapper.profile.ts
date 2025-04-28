import { Injectable } from "@nestjs/common";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";
import {
  createMap,
  forMember,
  mapFrom,
  Mapper,
  MappingProfile,
} from "@automapper/core";
import { TaskEntity } from "../entities/task.entity";
import { TaskModel } from "../models/task.model";

@Injectable()
export class MapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        TaskEntity,
        TaskModel,
        forMember(
          (d) => d.createdAt,
          mapFrom((s) => (s.createdAt ? s.createdAt.toISOString() : null))
        ),
        forMember(
          (d) => d.updatedAt,
          mapFrom((s) => (s.updatedAt ? s.updatedAt.toISOString() : null))
        )
      );
      createMap(mapper, TaskModel, TaskEntity);
    };
  }
}
