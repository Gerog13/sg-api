import { createClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

export const SupabaseClient = (configService: ConfigService) => {
  return createClient(
    configService.get('SUPABASE_URL'),
    configService.get('SUPABASE_KEY'),
  );
};
