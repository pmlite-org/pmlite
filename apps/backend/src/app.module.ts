import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TaskEntity } from './task/task.entity';
import { MapperProfile } from './automapper.profile';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USERNAME || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_DATABASE || 'pmlite',
      ssl: process.env.DB_SSL === 'true',
      entities: [TaskEntity],
      synchronize: process.env.NODE_ENV !== 'production',
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    TaskModule,
  ],
  providers: [MapperProfile],
})
export class AppModule {}
