import { IsString, IsOptional, IsEnum, IsInt } from 'class-validator';
import { TaskStatus } from './create-task.dto';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsInt()
  project_id?: number;

  @IsOptional()
  @IsInt()
  assigned_user_id?: number;
}
