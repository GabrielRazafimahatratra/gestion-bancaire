import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import * as nodemailer from 'nodemailer'

@Injectable()
export class MyemailService {

    constructor(private readonly mailerService: MailerService) {}
    
    async sendCustomEmail() {
        const mailOptions: nodemailer.SendMailOptions = {

            from: 'gabrielrazafimahatratra@gmail.com',
            to: 'fifalianagabrielrfg@gmail.com',
            subject: 'Relevé de compte',
            html: `
                <h1>Releve Bancaire</h1>
                <p>Voici votre nouveau solde</p>
            `,
        };

        try {
            await this.mailerService.sendMail(mailOptions);
            console.log('Email envoyé avec succès');
        } catch (error) {
            console.error('Error lors de l envoi de l email:', error);
        }
    }
}
