import { Module } from "@nestjs/common";
import { VirementsService } from "./virements.service";
import { PrismaService } from "prisma/prisma.service";
import { VirementsController } from "./virements.controller";
import { HistoriquesService } from "src/historiques/historiques.service";
import { MyemailService } from "src/myemail/myemail.service";
import { MailerService } from "src/mailer/mailer.service";

@Module({
    providers: [VirementsService, PrismaService, HistoriquesService, MyemailService, MailerService],
    controllers: [VirementsController]
})
export class VirementsModule {}