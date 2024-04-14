import { Module } from "@nestjs/common";
import { VersementsService } from "./versements.service";
import { PrismaService } from "prisma/prisma.service";
import { VersementsController } from "./versements.controller";

@Module({
    providers: [VersementsService, PrismaService],
    controllers: [VersementsController]
})
export class VersementsModule {}