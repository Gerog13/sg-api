import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Get,
  Query,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('tasks')
@UseGuards(JwtAuthGuard, RolesGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @Roles('admin', 'user')
  async create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
    if (
      req.user.role !== 'admin' &&
      req.user.userId !== createTaskDto.assigned_user_id
    ) {
      throw new ForbiddenException(
        'You can only create tasks assigned to yourself',
      );
    }

    const task = await this.tasksService.create(createTaskDto);

    console.log(
      `Notification sent to user with ID ${task.assigned_user_id} about the new task: ${task.name}`,
    );

    return task;
  }

  @Patch(':id')
  @Roles('admin', 'user')
  async updateStatus(
    @Param('id') id: number,
    @Body() updateTaskDto: UpdateTaskDto,
    @Request() req,
  ) {
    const task = await this.tasksService.findOne(id);

    if (
      req.user.role !== 'admin' &&
      req.user.userId !== task.assigned_user_id
    ) {
      throw new ForbiddenException('You can only update tasks assigned to you');
    }

    const updatedTask = await this.tasksService.updateStatus(id, updateTaskDto);

    console.log(
      `Notification sent to user with ID ${updatedTask.assigned_user_id} about the task update: ${updatedTask.name}`,
    );

    return updatedTask;
  }

  @Get()
  @Roles('admin', 'user')
  async findByProject(@Query('project_id') projectId: number, @Request() req) {
    if (req.user.role === 'admin') {
      return this.tasksService.findByProject(projectId);
    }

    return this.tasksService.findByProjectAndUser(projectId, req.user.userId);
  }
}
