import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv'

dotenv.config();

@Injectable()
export class MailerService {
    private transporter: nodemailer.transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
    }

    async sendMail(options: nodemailer.SendMailOptions): Promise<any> {
        return await this.transporter.sendMail(options);
    }
}
