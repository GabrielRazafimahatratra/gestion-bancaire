import { Module } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { ClientsController } from './clients.controller';
import { PrismaService } from 'prisma/prisma.service';
import { HistoriquesService } from 'src/historiques/historiques.service';

@Module({
  controllers: [ClientsController],
  providers: [ClientsService, PrismaService, HistoriquesService],
})
export class ClientsModule {}
