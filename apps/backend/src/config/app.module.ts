import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { AutomapperModule } from "@automapper/nestjs";
import { classes } from "@automapper/classes";
import { UsersModule } from "../modules/users.module";
import { TasksModule } from "../modules/tasks.module";
import { MapperProfile } from "./automapper.profile";

@Module({
  imports: [
    UsersModule,
    TasksModule,
    ConfigModule.forRoot({
      envFilePath: [".env.development"],
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      ssl: process.env.DB_SSL === "true",
      entities: [__dirname + "../../**/*.entity.{js,ts}"],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
  ],
  providers: [MapperProfile],
})
export class AppModule {}
