import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedClients } from 'prisma/seed/clients.seed';
import { seedVersement } from 'prisma/seed/versement.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await seedClients();
  await seedVersement();
  await app.listen(3000);
}
bootstrap();
