import { Module } from "@nestjs/common";
import { PretsController } from './prets.controller';
import { PretsService } from './prets.service';
import { PrismaService } from "prisma/prisma.service";
import { HistoriquesService } from "src/historiques/historiques.service";
import { MyemailService } from "src/myemail/myemail.service";
import { MailerService } from "src/mailer/mailer.service";

@Module({
    providers: [PretsService, PrismaService, HistoriquesService, MyemailService, MailerService],
    controllers: [PretsController]
})
export class PretModule {}