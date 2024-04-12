import { Module } from "@nestjs/common";
import { BanqueService } from "./banque.service";
import { BanqueController } from "./banque.controller";
import { PrismaService } from "prisma/prisma.service";

@Module({
    providers: [BanqueService,PrismaService
    ],
    controllers: [BanqueController]
})
export class BanqueModule {}