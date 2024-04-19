import { Module } from "@nestjs/common";
import { PretsController } from './prets.controller';
import { PretsService } from './prets.service';
import { PrismaService } from "prisma/prisma.service";
import { HistoriquesService } from "src/historiques/historiques.service";

@Module({
    providers: [PretsService, PrismaService, HistoriquesService],
    controllers: [PretsController]
})
export class PretModule {}