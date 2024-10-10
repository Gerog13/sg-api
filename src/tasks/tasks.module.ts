import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseClient } from '../supabase';

@Module({
  imports: [ConfigModule],
  controllers: [TasksController],
  providers: [
    TasksService,
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: SupabaseClient,
      inject: [ConfigService],
    },
  ],
})
export class TasksModule {}
