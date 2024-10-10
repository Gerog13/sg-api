import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseClient } from '../supabase';

@Module({
  imports: [ConfigModule],
  controllers: [ProjectsController],
  providers: [
    ProjectsService,
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: SupabaseClient,
      inject: [ConfigService],
    },
  ],
})
export class ProjectsModule {}
