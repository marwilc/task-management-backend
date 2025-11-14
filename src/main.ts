import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
// dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_URL ?? 'http://localhost:3000', // o el puerto donde corre tu Next.js
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
