import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SERVER_PORT } from './config/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // For make sure CORS only enable for localhost only.
  app.enableCors({ origin: ['http://localhost:3000'] });
  await app.listen(SERVER_PORT);
}
bootstrap();
