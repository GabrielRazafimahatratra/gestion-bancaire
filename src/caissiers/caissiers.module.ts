import { Module } from "@nestjs/common";
import { CaissiersController } from "./caissiers.controller";
import { CaissiersService } from "./caissiers.service";
import { PrismaService } from "prisma/prisma.service";

@Module({
    controllers: [CaissiersController],
    providers: [CaissiersService, PrismaService]
})
export class CaissiersModule{}