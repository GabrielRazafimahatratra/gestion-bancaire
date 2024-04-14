import { Module } from "@nestjs/common";
import { VirementsService } from "./virements.service";
import { PrismaService } from "prisma/prisma.service";
import { VirementsController } from "./virements.controller";

@Module({
    providers: [VirementsService, PrismaService],
    controllers: [VirementsController]
})
export class VirementsModule {}