
import { Module } from '@nestjs/common';
import { RetraitsController } from './retraits.controller';
import { RetraitsService } from './retraits.service';
import { PrismaService } from 'prisma/prisma.service';
import { HistoriquesService } from 'src/historiques/historiques.service';
import { MyemailService } from 'src/myemail/myemail.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
    providers: [RetraitsService, PrismaService, HistoriquesService, MyemailService, MailerService],
    controllers: [RetraitsController]
})
export class RetraitsModule {}