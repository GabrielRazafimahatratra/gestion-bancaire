import { Module } from "@nestjs/common";
import { VersementsService } from "./versements.service";
import { PrismaService } from "prisma/prisma.service";
import { VersementsController } from "./versements.controller";
import { HistoriquesService } from "src/historiques/historiques.service";
import { MyemailService } from "src/myemail/myemail.service";
import { MailerService } from "src/mailer/mailer.service";

@Module({
    providers: [VersementsService, PrismaService, HistoriquesService, MyemailService, MailerService],
    controllers: [VersementsController]
})
export class VersementsModule {}