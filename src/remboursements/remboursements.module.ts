
import { Module } from '@nestjs/common';
import { RemboursementsController } from './remboursements.controller';
import { RemboursementsService } from './remboursements.service';
import { PrismaService } from 'prisma/prisma.service';
import { HistoriquesService } from 'src/historiques/historiques.service';
import { MyemailService } from 'src/myemail/myemail.service';
import { MailerService } from 'src/mailer/mailer.service';


@Module({
    providers: [RemboursementsService, PrismaService, HistoriquesService, MyemailService, MailerService],
    controllers: [RemboursementsController]
})
export class RemboursementModule {}