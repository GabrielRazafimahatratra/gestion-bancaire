import { Module } from "@nestjs/common";
import { VersementsService } from "./versements.service";
import { PrismaService } from "prisma/prisma.service";
import { VersementsController } from "./versements.controller";
import { HistoriquesService } from "src/historiques/historiques.service";

@Module({
    providers: [VersementsService, PrismaService, HistoriquesService],
    controllers: [VersementsController]
})
export class VersementsModule {}