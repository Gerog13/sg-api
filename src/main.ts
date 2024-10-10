import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import serverless from 'serverless-http';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

const expressApp = express();

async function bootstrap() {
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
  });
  await app.init();
}

bootstrap();

export const handler = serverless(expressApp);
