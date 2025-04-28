import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsDateString,
  IsNumber,
  Length,
  IsString,
  IsUUID,
} from "class-validator";
import { ValidateNested, IsArray, IsOptional } from "class-validator";
import { Type } from "class-transformer";

export class TaskModel {
  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    format: "uuid",
    nullable: true,
  })
  @IsOptional()
  @IsUUID()
  uuid?: string | null;

  @AutoMap()
  @ApiProperty({ required: true, type: Number })
  @IsNumber()
  rank: number;

  @AutoMap()
  @ApiProperty({ required: false, type: String, maxLength: 50, nullable: true })
  @IsOptional()
  @Length(0, 50)
  @IsString()
  taskId?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, maxLength: 50, nullable: true })
  @IsOptional()
  @Length(0, 50)
  @IsString()
  team?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, maxLength: 50, nullable: true })
  @IsOptional()
  @Length(0, 50)
  @IsString()
  epicId?: string | null;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    maxLength: 100,
    nullable: true,
  })
  @IsOptional()
  @Length(0, 100)
  @IsString()
  name?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  type?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  taskType?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  status?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  priority?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  plannedPersonDay?: number | null;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  plannedStartDate?: string | null;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  plannedEndDate?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: Number, nullable: true })
  @IsOptional()
  @IsNumber()
  actualPersonDay?: number | null;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  actualStartDate?: string | null;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  actualEndDate?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  assigneeId?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  reporterId?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  description?: string | null;

  @AutoMap()
  @ApiProperty({ required: false, type: String, nullable: true })
  @IsOptional()
  @IsString()
  blockedBy?: string | null;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  createdAt?: string | null;

  @AutoMap()
  @ApiProperty({
    required: false,
    type: String,
    format: "date-time",
    nullable: true,
  })
  @IsOptional()
  @IsDateString()
  updatedAt?: string | null;
}

export class BulkUpsertTasksModel {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TaskModel)
  @ApiProperty({ type: [TaskModel] })
  tasks: TaskModel[];
}
