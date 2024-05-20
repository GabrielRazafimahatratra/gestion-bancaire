import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { seedClients } from 'prisma/seed/clients.seed';
import { seedVersement } from 'prisma/seed/versement.seed';
import { seedPrets } from 'prisma/seed/prets.seed';
import { seedRemboursementPrets } from 'prisma/seed/remboursementPrets.seed';
import { seedRetraits } from 'prisma/seed/retraits.seed';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await seedClients();
  await seedVersement();
  await seedPrets();
  await seedRemboursementPrets();
  await seedRetraits();
  await app.listen(4000);
}
bootstrap();
