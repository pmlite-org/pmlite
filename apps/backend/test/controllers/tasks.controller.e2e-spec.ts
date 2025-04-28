import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../../src/config/app.module';
import { TaskModel } from '../../src/presentation/models/task.model';
import { TaskEntity } from '../../src/entities/task.entity';

describe('TasksController (e2e)', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    dataSource = app.get(DataSource);

    // テーブルをクリア
    await dataSource.getRepository(TaskEntity).clear();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/tasks (GET)', () => {
    return request(app.getHttpServer())
      .get('/tasks')
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
      });
  });

  it('/tasks/bulk-upsert (POST) - success', async () => {
    const tasks: TaskModel[] = [
      {
        rank: 0,
      },
      {
        rank: 1,
        taskId: 'task1',
        team: 'team1',
        epicId: 'epic1',
        name: 'Task 1',
        type: 'type1',
        taskType: 'taskType1',
        status: 'status1',
        priority: 'priority1',
        plannedPersonDay: 0.1,
        plannedStartDate: '2023-01-01',
        plannedEndDate: '2023-01-02',
        actualPersonDay: 1000,
        actualStartDate: '2023-01-01T00:00:00Z',
        actualEndDate: '2023-01-02T00:00:00Z',
        assigneeId: 'assignee1',
        reporterId: 'reporter1',
        description: 'description1',
        blockedBy: 'blockedBy1',
        createdAt: '2023-01-01T00:00:00Z',
        updatedAt: '2023-01-02T00:00:00Z',
      },
    ];

    await request(app.getHttpServer())
      .post('/tasks/bulk-upsert')
      .send({ tasks })
      .expect(200)
      .expect(res => {
        expect(Array.isArray(res.body)).toBe(true);
        expect(res.body.length).toBe(tasks.length);
      });
  });

  it('/tasks/bulk-upsert (POST) - validation failed', async () => {
    const tasks = [
      {
        rank: 0,
      },
      {
        rank: 2,
        taskId: '012345678901234567890123456789012345678901234567890123456789',
        team: '012345678901234567890123456789012345678901234567890123456789',
        epicId: '012345678901234567890123456789012345678901234567890123456789',
        name: '012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789',
        plannedPersonDay: 'invalid',
        plannedStartDate: 'invalid',
        plannedEndDate: 'invalid',
        actualPersonDay: 'invalid',
        actualStartDate: 'invalid',
        actualEndDate: 'invalid',
        createdAt: 'invalid',
        updatedAt: 'invalid',
      },
    ];

    await request(app.getHttpServer())
      .post('/tasks/bulk-upsert')
      .send({ tasks })
      .expect(400)
      .expect(res => {
        expect(res.body.message).toContain(
          'tasks.1.taskId must be shorter than or equal to 50 characters'
        );
        expect(res.body.message).toContain(
          'tasks.1.team must be shorter than or equal to 50 characters'
        );
        expect(res.body.message).toContain(
          'tasks.1.epicId must be shorter than or equal to 50 characters'
        );
        expect(res.body.message).toContain(
          'tasks.1.name must be shorter than or equal to 100 characters'
        );
        expect(res.body.message).toContain(
          'tasks.1.plannedPersonDay must be a number conforming to the specified constraints'
        );
        expect(res.body.message).toContain(
          'tasks.1.plannedStartDate must be a valid ISO 8601 date string'
        );
        expect(res.body.message).toContain(
          'tasks.1.plannedEndDate must be a valid ISO 8601 date string'
        );
        expect(res.body.message).toContain(
          'tasks.1.actualPersonDay must be a number conforming to the specified constraints'
        );
        expect(res.body.message).toContain(
          'tasks.1.actualStartDate must be a valid ISO 8601 date string'
        );
        expect(res.body.message).toContain(
          'tasks.1.actualEndDate must be a valid ISO 8601 date string'
        );
        expect(res.body.message).toContain(
          'tasks.1.createdAt must be a valid ISO 8601 date string'
        );
        expect(res.body.message).toContain(
          'tasks.1.updatedAt must be a valid ISO 8601 date string'
        );
      });
  });

  it('/tasks/bulk-upsert (POST) - type validation failed', async () => {
    const tasks = [
      {
        rank: 0,
        type: 123,
        taskType: 123,
        status: 123,
        priority: 123,
        assigneeId: 123,
        reporterId: 123,
        description: 123,
        blockedBy: 123,
      },
    ];

    await request(app.getHttpServer())
      .post('/tasks/bulk-upsert')
      .send({ tasks })
      .expect(400)
      .expect(res => {
        expect(res.body.message).toContain('tasks.0.type must be a string');
        expect(res.body.message).toContain('tasks.0.taskType must be a string');
        expect(res.body.message).toContain('tasks.0.status must be a string');
        expect(res.body.message).toContain('tasks.0.priority must be a string');
        expect(res.body.message).toContain('tasks.0.assigneeId must be a string');
        expect(res.body.message).toContain('tasks.0.reporterId must be a string');
        expect(res.body.message).toContain('tasks.0.description must be a string');
        expect(res.body.message).toContain('tasks.0.blockedBy must be a string');
      });
  });

  it('/tasks/bulk-upsert (POST) - string validation failed', async () => {
    const tasks = [
      {
        rank: 0,
        taskId: 123,
        team: 123,
        epicId: 123,
        name: 123,
        type: 123,
        taskType: 123,
        status: 123,
        priority: 123,
        assigneeId: 123,
        reporterId: 123,
        description: 123,
        blockedBy: 123,
      },
    ];

    await request(app.getHttpServer())
      .post('/tasks/bulk-upsert')
      .send({ tasks })
      .expect(400)
      .expect(res => {
        expect(res.body.message).toContain('tasks.0.taskId must be a string');
        expect(res.body.message).toContain('tasks.0.team must be a string');
        expect(res.body.message).toContain('tasks.0.epicId must be a string');
        expect(res.body.message).toContain('tasks.0.name must be a string');
        expect(res.body.message).toContain('tasks.0.type must be a string');
        expect(res.body.message).toContain('tasks.0.taskType must be a string');
        expect(res.body.message).toContain('tasks.0.status must be a string');
        expect(res.body.message).toContain('tasks.0.priority must be a string');
        expect(res.body.message).toContain('tasks.0.assigneeId must be a string');
        expect(res.body.message).toContain('tasks.0.reporterId must be a string');
        expect(res.body.message).toContain('tasks.0.description must be a string');
        expect(res.body.message).toContain('tasks.0.blockedBy must be a string');
      });
  });

  it('/tasks/bulk-upsert (POST) - uuid validation failed', async () => {
    const tasks = [
      {
        rank: 0,
        uuid: 'invalid-uuid',
      },
    ];

    await request(app.getHttpServer())
      .post('/tasks/bulk-upsert')
      .send({ tasks })
      .expect(400)
      .expect(res => {
        expect(res.body.message).toContain('tasks.0.uuid must be a UUID');
      });
  });

  it('/tasks/bulk-upsert (POST) - tasks not provided', async () => {
    await request(app.getHttpServer())
      .post('/tasks/bulk-upsert')
      .send({})
      .expect(400)
      .expect(res => {
        expect(res.body.message).toContain('tasks must be an array');
      });
  });

  it('/tasks/bulk-upsert (POST) - required fields missing', async () => {
    const tasks = [
      {
        taskId: 'task1',
      },
    ];

    await request(app.getHttpServer())
      .post('/tasks/bulk-upsert')
      .send({ tasks })
      .expect(400)
      .expect(res => {
        expect(res.body.message).toContain(
          'tasks.0.rank must be a number conforming to the specified constraints'
        );
      });
  });

  it('/tasks/bulk-delete (DELETE)', async () => {
    // データベースにデータをセットアップ
    const tasks: TaskEntity[] = [
      {
        rank: 1,
      },
    ];

    const entity = await dataSource.getRepository(TaskEntity).save(tasks);

    const uuids: string[] = [entity[0].uuid];

    return request(app.getHttpServer()).delete('/tasks/bulk-delete').send(uuids).expect(200);
  });
});
