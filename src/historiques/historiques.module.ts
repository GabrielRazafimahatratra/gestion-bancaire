
import { Module } from '@nestjs/common';
import { HistoriquesController } from './historiques.controller';
import { HistoriquesService } from './historiques.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    providers: [HistoriquesService, PrismaService],
    controllers: [HistoriquesController]
})
export class HistoriquesModule {}