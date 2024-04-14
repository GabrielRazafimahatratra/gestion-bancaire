
import { Module } from '@nestjs/common';
import { RetraitsController } from './retraits.controller';
import { RetraitsService } from './retraits.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
    providers: [RetraitsService, PrismaService],
    controllers: [RetraitsController]
})
export class RetraitsModule {}