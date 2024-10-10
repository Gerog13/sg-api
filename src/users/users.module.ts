import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SupabaseClient } from 'src/supabase';

@Module({
  imports: [ConfigModule],
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'SUPABASE_CLIENT',
      useFactory: SupabaseClient,
      inject: [ConfigService],
    },
  ],
  exports: [UsersService],
})
export class UsersModule {}
