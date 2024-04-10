import { Module } from "@nestjs/common";
import { PretsController } from './prets.controller';
import { PretsService } from './prets.service';
import { PrismaService } from "prisma/prisma.service";

@Module({
    providers: [PretsService, PrismaService],
    controllers: [PretsController]
})
export class PretModule {}