import { makeApi, Zodios, type ZodiosOptions } from '@zodios/core';
import { z } from 'zod';

const UserModel = z.object({}).partial().passthrough();
const TaskModel = z
  .object({
    uuid: z.string().uuid().nullish(),
    rank: z.number(),
    taskId: z.string().max(50).nullish(),
    team: z.string().max(50).nullish(),
    epicId: z.string().max(50).nullish(),
    name: z.string().max(100).nullish(),
    type: z.string().nullish(),
    taskType: z.string().nullish(),
    status: z.string().nullish(),
    priority: z.string().nullish(),
    plannedPersonDay: z.number().nullish(),
    plannedStartDate: z.string().datetime({ offset: true }).nullish(),
    plannedEndDate: z.string().datetime({ offset: true }).nullish(),
    actualPersonDay: z.number().nullish(),
    actualStartDate: z.string().datetime({ offset: true }).nullish(),
    actualEndDate: z.string().datetime({ offset: true }).nullish(),
    assigneeId: z.string().nullish(),
    reporterId: z.string().nullish(),
    description: z.string().nullish(),
    blockedBy: z.string().nullish(),
    createdAt: z.string().datetime({ offset: true }).nullish(),
    updatedAt: z.string().datetime({ offset: true }).nullish(),
  })
  .passthrough();
const BulkUpsertTasksModel = z.object({ tasks: z.array(TaskModel) }).passthrough();

export const schemas = {
  UserModel,
  TaskModel,
  BulkUpsertTasksModel,
};

const endpoints = makeApi([
  {
    method: 'get',
    path: '/tasks',
    alias: 'getTasks',
    requestFormat: 'json',
    response: z.array(TaskModel),
  },
  {
    method: 'delete',
    path: '/tasks/bulk-delete',
    alias: 'bulkDeleteTasks',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.array(z.string()),
      },
    ],
    response: z.void(),
  },
  {
    method: 'post',
    path: '/tasks/bulk-upsert',
    alias: 'bulkUpsertTasks',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: BulkUpsertTasksModel,
      },
    ],
    response: z.array(TaskModel),
  },
  {
    method: 'get',
    path: '/users',
    alias: 'usersGet',
    requestFormat: 'json',
    response: z.array(UserModel),
  },
  {
    method: 'post',
    path: '/users',
    alias: 'usersCreate',
    requestFormat: 'json',
    parameters: [
      {
        name: 'body',
        type: 'Body',
        schema: z.object({}).partial().passthrough(),
      },
    ],
    response: z.object({}).partial().passthrough(),
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
