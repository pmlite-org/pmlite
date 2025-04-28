import { Test, TestingModule } from "@nestjs/testing";
import { TasksController } from "../../src/controllers/tasks.controller";
import { TasksService } from "../../src/services/tasks.service";
import { TaskModel } from "../../src/models/task.model";

describe("TasksController", () => {
  let tasksController: TasksController;
  let tasksService: TasksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TasksController],
      providers: [
        {
          provide: TasksService,
          useValue: {
            find: jest.fn(),
            bulkUpsert: jest.fn(),
            bulkDelete: jest.fn(),
          },
        },
      ],
    }).compile();

    tasksController = module.get<TasksController>(TasksController);
    tasksService = module.get<TasksService>(TasksService);
  });

  it("should be defined", () => {
    expect(tasksController).toBeDefined();
  });

  describe("find", () => {
    it("should return an array of tasks", async () => {
      const result: TaskModel[] = [];
      jest.spyOn(tasksService, "find").mockResolvedValue(result);

      expect(await tasksController.find()).toBe(result);
    });
  });

  describe("bulkUpsertTasks", () => {
    it("should return an array of upserted tasks", async () => {
      const result: TaskModel[] = [];
      const bulkUpsertTasksModel: TaskModel[] = [];
      jest.spyOn(tasksService, "bulkUpsert").mockResolvedValue(result);

      expect(await tasksController.bulkUpsertTasks(bulkUpsertTasksModel)).toBe(
        result
      );
    });
  });

  describe("bulkDeleteTasks", () => {
    it("should delete tasks and return void", async () => {
      const uuids: string[] = [];
      jest.spyOn(tasksService, "bulkDelete").mockResolvedValue();

      expect(await tasksController.bulkDeleteTasks(uuids)).toBeUndefined();
    });
  });
});
