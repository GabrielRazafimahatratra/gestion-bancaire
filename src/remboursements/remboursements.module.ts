
import { Module } from '@nestjs/common';
import { RemboursementsController } from './remboursements.controller';
import { RemboursementsService } from './remboursements.service';
import { PrismaService } from 'prisma/prisma.service';
import { HistoriquesService } from 'src/historiques/historiques.service';


@Module({
    providers: [RemboursementsService, PrismaService, HistoriquesService],
    controllers: [RemboursementsController]
})
export class RemboursementModule {}