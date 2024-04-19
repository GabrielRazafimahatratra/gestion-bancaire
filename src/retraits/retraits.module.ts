
import { Module } from '@nestjs/common';
import { RetraitsController } from './retraits.controller';
import { RetraitsService } from './retraits.service';
import { PrismaService } from 'prisma/prisma.service';
import { HistoriquesService } from 'src/historiques/historiques.service';

@Module({
    providers: [RetraitsService, PrismaService, HistoriquesService],
    controllers: [RetraitsController]
})
export class RetraitsModule {}