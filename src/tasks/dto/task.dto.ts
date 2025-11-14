import { Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { TaskStatus } from 'generated/prisma/client';

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date: Date;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes: string;
}

export class UpdateTaskDto {
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(255)
  title: string;

  @IsDate()
  @Type(() => Date)
  @IsOptional()
  date: Date;

  @IsEnum(TaskStatus)
  @IsOptional()
  status: TaskStatus;

  @IsString()
  @IsOptional()
  @MaxLength(1000)
  notes: string;
}

export class DeleteTaskByStatusDto {
  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;
}
