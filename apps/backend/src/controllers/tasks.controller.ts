import { Controller, Get, Post, Body, Delete, HttpCode } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from "@nestjs/swagger";
import { TasksService } from "../services/tasks.service";
import { BulkUpsertTasksModel, TaskModel } from "../models/task.model";

@ApiTags("tasks")
@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @ApiOperation({ summary: "Get tasks", operationId: "getTasks" })
  @ApiResponse({
    status: 200,
    description: "Tasks retrieved successfully.",
    type: [TaskModel],
  })
  async find(): Promise<TaskModel[]> {
    return await this.tasksService.find();
  }

  @Post("bulk-upsert")
  @HttpCode(200)
  @ApiOperation({
    summary: "Bulk upsert tasks",
    operationId: "bulkUpsertTasks",
  })
  @ApiResponse({
    status: 200,
    description: "Tasks have been successfully upserted.",
    type: [TaskModel],
  })
  @ApiBody({ type: BulkUpsertTasksModel })
  async bulkUpsertTasks(
    @Body() bulkUpsertTasksModel: BulkUpsertTasksModel
  ): Promise<TaskModel[]> {
    return await this.tasksService.bulkUpsert(bulkUpsertTasksModel.tasks);
  }

  @Delete("bulk-delete")
  @ApiOperation({
    summary: "Bulk delete tasks",
    operationId: "bulkDeleteTasks",
  })
  @ApiResponse({
    status: 200,
    description: "Tasks have been successfully deleted.",
  })
  @ApiBody({ type: [String] })
  async bulkDeleteTasks(@Body() uuids: string[]): Promise<void> {
    return await this.tasksService.bulkDelete(uuids);
  }
}
