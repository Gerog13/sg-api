import { Inject, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@Inject('SUPABASE_CLIENT') private readonly supabaseClient) {}

  async findOneByEmail(email: string) {
    const { data, error } = await this.supabaseClient
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const { error } = await this.supabaseClient
      .from('users')
      .insert({ ...createUserDto, password: hashedPassword });

    if (error) throw new Error(error.message);

    return { success: true, message: 'User created successfully' };
  }

  async findAll() {
    const { data, error } = await this.supabaseClient.from('users').select('*');

    if (error) {
      throw new Error(error.message);
    }
    return data;
  }
}
