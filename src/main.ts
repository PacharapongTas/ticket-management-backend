import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // For make sure CORS only enable for localhost only.
  app.enableCors({ origin: ['http://localhost:3000'] });
  await app.listen(2538);
}
bootstrap();
