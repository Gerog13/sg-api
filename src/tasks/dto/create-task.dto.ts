import { IsString, IsNotEmpty, IsInt, IsEnum } from 'class-validator';

export enum TaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

export class CreateTaskDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(TaskStatus)
  @IsNotEmpty()
  status: TaskStatus;

  @IsInt()
  @IsNotEmpty()
  project_id: number;

  @IsInt()
  @IsNotEmpty()
  assigned_user_id: number;
}
