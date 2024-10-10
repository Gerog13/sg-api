import { Injectable, Inject } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabaseClient) {}

  async create(createTaskDto: CreateTaskDto) {
    const { data, error } = await this.supabaseClient
      .from('tasks')
      .insert(createTaskDto)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: number) {
    const { data, error } = await this.supabaseClient
      .from('tasks')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async updateStatus(id: number, updateTaskDto: UpdateTaskDto) {
    const { data, error } = await this.supabaseClient
      .from('tasks')
      .update(updateTaskDto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findByProject(projectId: number) {
    const { data, error } = await this.supabaseClient
      .from('tasks')
      .select('*')
      .eq('project_id', projectId);

    if (error) throw new Error(error.message);
    return data;
  }

  async findByProjectAndUser(projectId: number, userId: number) {
    const { data, error } = await this.supabaseClient
      .from('tasks')
      .select('*')
      .eq('project_id', projectId)
      .eq('assigned_user_id', userId);

    if (error) throw new Error(error.message);
    return data;
  }
}
