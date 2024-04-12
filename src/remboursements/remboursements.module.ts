
import { Module } from '@nestjs/common';
import { RemboursementsController } from './remboursements.controller';
import { RemboursementsService } from './remboursements.service';
import { PrismaService } from 'prisma/prisma.service';


@Module({
    providers: [RemboursementsService, PrismaService],
    controllers: [RemboursementsController]
})
export class RemboursementModule {}