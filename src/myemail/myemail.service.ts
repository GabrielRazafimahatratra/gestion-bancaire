import { Injectable } from '@nestjs/common';
import { MailerService } from 'src/mailer/mailer.service';
import * as nodemailer from 'nodemailer'
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class MyemailService {

    constructor(private readonly mailerService: MailerService) {}
    
    async sendEmailForVersements(
        numeroVersement: string,
        numeroCompteVersement: string,
        montantVersement: Decimal,
        dateVersement: Date,
        nomVerseur: string,
        prenomsVerseur: string,
        emailClient: string
    ) {
        const mailOptions: nodemailer.SendMailOptions = {

            from: 'gabrielrazafimahatratra@gmail.com',
            to: emailClient,
            subject: 'Relevé de compte',
            html: `
                <p>Cher(e) Client(e),</p>
                <p>Ci-joint le detail de votre récent versement:</p>
                <ul>
                    <li><b><u>Numero Versement:</u></b> ${numeroVersement}</li>
                    <li><b><u>Numero compte Versement:</u></b> ${numeroCompteVersement}</li>
                    <li><b><u>Montant Versement:</u></b> ${montantVersement}</li>
                    <li><b><u>Date Versement: </u></b>${dateVersement}</li>
                    <li><b><u>Nom du verseur: </u></b>${nomVerseur}</li>
                    <li><b><u>Prenoms du verseur:</u></b> ${prenomsVerseur}</li>
                </ul>
            `,
        };

        try {
            await this.mailerService.sendMail(mailOptions);
            console.log('Email envoyé avec succès');
        } catch (error) {
            console.error('Error lors de l envoi de l email:', error);
        }
    }


    async sendEmailForVirement(
        numeroVirement: string,
        numeroCompteDestinataire: string,
        numeroCompteExpediteur: string,
        montantVirement: Decimal,
        dateVirement: Date,
        emailClient: string
    ) {
        const mailOptions: nodemailer.SendMailOptions = {

            from: 'gabrielrazafimahatratra@gmail.com',
            to: emailClient,
            subject: 'Relevé de compte',
            html: `
                <p>Cher(e) Client(e),</p>
                <p>Ci-joint le detail de votre récent virement:</p>
                <ul>
                    <li><b><u>Numero virement:</u></b> ${numeroVirement}</li>
                    <li><b><u>Numero compte destinataire:</u></b> ${numeroCompteDestinataire}</li>
                    <li><b><u>Numero compte expediteur:</u></b> ${numeroCompteExpediteur}</li>
                    <li><b><u>Montant virement: </u></b>${montantVirement}</li>
                    <li><b><u>Date virement: </u></b>${dateVirement}</li>
                </ul>
            `,
        };

        try {
            await this.mailerService.sendMail(mailOptions);
            console.log('Email envoyé avec succès');
        } catch (error) {
            console.error('Error lors de l envoi de l email:', error);
        }
    }

    async sendEmailForRetrait(
        numeroRetraits: string,
        numeroCompte: string,
        montantRetrait: Decimal,
        dateRetrait: Date,
        emailClient: string
    ) {
        const mailOptions: nodemailer.SendMailOptions = {

            from: 'gabrielrazafimahatratra@gmail.com',
            to: emailClient,
            subject: 'Relevé de compte',
            html: `
                <p>Cher(e) Client(e),</p>
                <p>Ci-joint le detail de votre récent retrait:</p>
                <ul>
                    <li><b><u>Numero retrait:</u></b> ${numeroRetraits}</li>
                    <li><b><u>Numero compte:</u></b> ${numeroCompte}</li>
                    <li><b><u>Montant retrait:</u></b> ${montantRetrait}</li>
                    <li><b><u>Date retrait: </u></b>${dateRetrait}</li>
                </ul>
            `,
        };

        try {
            await this.mailerService.sendMail(mailOptions);
            console.log('Email envoyé avec succès');
        } catch (error) {
            console.error('Error lors de l envoi de l email:', error);
        }
    }


    async sendEmailForRemboursement(
        idRemboursement: string,
        numeroCompteDeLaBanque: string,
        montantAPayer: Decimal,
        numeroCompte: string,
        numeroPret: string,
        emailClient: string
    ) {
        const mailOptions: nodemailer.SendMailOptions = {

            from: 'gabrielrazafimahatratra@gmail.com',
            to: emailClient,
            subject: 'Relevé de compte',
            html: `
                <p>Cher(e) Client(e),</p>
                <p>Ci-joint le detail de votre récent remboursement:</p>
                <ul>
                    <li><b><u>Numero remboursement:</u></b> ${idRemboursement}</li>
                    <li><b><u>Numero compte de la banque:</u></b> ${numeroCompteDeLaBanque}</li>
                    <li><b><u>Montant remboursement:</u></b> ${montantAPayer}</li>
                    <li><b><u>Numero compte: </u></b>${numeroCompte}</li>
                    <li><b><u>Numero pret: </u></b>${numeroPret}</li>
                </ul>
            `,
        };

        try {
            await this.mailerService.sendMail(mailOptions);
            console.log('Email envoyé avec succès');
        } catch (error) {
            console.error('Error lors de l envoi de l email:', error);
        }
    }


    async sendEmailForLoan(
        numeroPret: string,
        montantPret: Decimal,
        tauxPret: Decimal,
        delaiPret: number,
        datePret: Date,
        montantARendre: Decimal,
        restePret: Decimal,
        numeroCompteEmprunteur: string,
        emailClient: string
    ) {
        const mailOptions: nodemailer.SendMailOptions = {

            from: 'gabrielrazafimahatratra@gmail.com',
            to: emailClient,
            subject: 'Relevé de compte',
            html: `
                <p>Cher(e) Client(e),</p>
                <p>Ci-joint le detail de votre récent pret:</p>
                <ul>
                    <li><b><u>Numero pret:</u></b> ${numeroPret}</li>
                    <li><b><u>Montant pret:</u></b> ${montantPret}</li>
                    <li><b><u>Taux prett:</u></b> ${tauxPret}</li>
                    <li><b><u>Delai pret: </u></b>${delaiPret}</li>
                    <li><b><u>Date pret: </u></b>${datePret}</li>
                    <li><b><u>Montant à rendre: </u></b>${montantARendre}</li>
                    <li><b><u>Reste pret: </u></b>${restePret}</li>
                    <li><b><u>Numero compte emprunteur: </u></b>${numeroCompteEmprunteur}</li>
                </ul>
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
