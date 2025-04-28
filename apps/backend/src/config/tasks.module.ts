import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksService } from '../application/usecases/tasks.service';
import { TasksController } from '../presentation/controllers/tasks.controller';
import { TasksRepositoryImpl } from '../infrastructure/repositories/tasks.repository';
import { TaskEntity } from '../domain/entities/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskEntity])],
  controllers: [TasksController],
  providers: [TasksService, TasksRepositoryImpl],
})
export class TasksModule {}
