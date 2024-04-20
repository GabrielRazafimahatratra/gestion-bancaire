
import { MailerService } from './mailer.service';
import { Module } from '@nestjs/common';


@Module({
    providers: [MailerService]
})
export class MailerModule {}