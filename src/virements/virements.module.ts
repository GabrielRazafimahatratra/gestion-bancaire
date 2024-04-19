import { Module } from "@nestjs/common";
import { VirementsService } from "./virements.service";
import { PrismaService } from "prisma/prisma.service";
import { VirementsController } from "./virements.controller";
import { HistoriquesService } from "src/historiques/historiques.service";

@Module({
    providers: [VirementsService, PrismaService, HistoriquesService],
    controllers: [VirementsController]
})
export class VirementsModule {}