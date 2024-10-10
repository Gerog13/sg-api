import { Injectable, Inject } from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabaseClient) {}

  async findAll() {
    const { data, error } = await this.supabaseClient
      .from('projects')
      .select('*');
    if (error) throw new Error(error.message);
    return data;
  }

  async findProjectsByUser(userId: number) {
    const { data, error } = await this.supabaseClient
      .from('projects')
      .select('*')
      .eq('user_id', userId);
    if (error) throw new Error(error.message);
    return data;
  }

  async create(createProjectDto: CreateProjectDto) {
    const { data, error } = await this.supabaseClient
      .from('projects')
      .insert(createProjectDto)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async update(id: number, updateProjectDto: UpdateProjectDto) {
    const { data, error } = await this.supabaseClient
      .from('projects')
      .update(updateProjectDto)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: number) {
    const { data, error } = await this.supabaseClient
      .from('projects')
      .delete()
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async findById(id: number) {
    const { data, error } = await this.supabaseClient
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();
    if (error) throw new Error(error.message);
    return data;
  }
}
