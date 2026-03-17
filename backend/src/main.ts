import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  if (process.env.NODE_ENV === 'development') {
    // En dev: allow all origins
    app.enableCors();
  } else {
    // En prod: strict CORS
    const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:3001';
    console.log('CORS Origin:', corsOrigin);
    app.enableCors({
      origin: corsOrigin,
      credentials: true,
    });
  }
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
