import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePretDto } from './dto/create-pret.dto';
import { UpdatePretDto } from './dto/update-pret.dto';
import { HistoriquesService } from 'src/historiques/historiques.service';
import { EventType } from 'src/historiques/event-type';
import { MyemailService } from 'src/myemail/myemail.service';

@Injectable()
export class PretsService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly historique: HistoriquesService,
        private readonly myEmailService: MyemailService
    ) {}

    async createLoan(createLoan: CreatePretDto) {

        const numeroPretGenere = await this.genererNumeroPret();

        const tauxPret = parseFloat(createLoan.tauxPret.toString());
        const montantPret = parseFloat(createLoan.montantPret.toString());

        const calculMontantARendre = tauxPret * montantPret;

        const loan = await this.prisma.pret.create({
            data: {
                ...createLoan,
                montantARendre: calculMontantARendre,
                restePret: calculMontantARendre,
                numeroPret: numeroPretGenere
            }
                
        });

        const compteBancaireClient = loan.numeroCompteEmprunteur

        const ancienSoldeClient = await this.prisma.client.findUnique({
            where: {numeroCompte: compteBancaireClient}
        });
        const ancienSoldeClientToFloat = parseFloat(ancienSoldeClient.montantClient.toString());
        const nouveauSoldeClient = ancienSoldeClientToFloat + montantPret;

        const montantTotalClient = await this.prisma.client.update({
            where: {numeroCompte: compteBancaireClient},
            data: {
                montantClient: nouveauSoldeClient
            }
           
        });

        
        const loanTypeToJSON = JSON.stringify(loan);
        const nouveauSoldeClientToJSONType = JSON.stringify(montantTotalClient);

        await this.historique.historiquesDesEvenements(EventType.PRET_CREATED, loan.numeroPret, loanTypeToJSON);

        const emailClientAPartirDuNumeroCompte = await this.prisma.pret.findUnique({
            where : {
                numeroCompteEmprunteur: loan.numeroCompteEmprunteur,
                numeroPret: loan.numeroPret
            },
            select: {
                emprunteur: {
                    select: { emailClient: true}
                }
            }
        }).then(result => result?.emprunteur.emailClient);



        await this.myEmailService.sendEmailForLoan(
            loan.numeroPret,
            loan.montantPret,
            loan.tauxPret,
            loan.delaiPret,
            loan.datePret,
            loan.montantARendre,
            loan.restePret,
            loan.numeroCompteEmprunteur,
            emailClientAPartirDuNumeroCompte
        );


        return {
            loanTypeToJSON,
            nouveauSoldeClientToJSONType
        };
    }


    private async genererNumeroPret(): Promise<string> {
        const dernierPret = await this.prisma.pret.findFirst({
            orderBy: {
                numeroPret: 'desc',
            },
            select: {
                numeroPret: true,
            }
        });
    
        if (!dernierPret) { return 'Pret001';}
    
        const lastNumber = parseInt(dernierPret.numeroPret.slice(4),10);
        const newNumber = String(lastNumber + 1).padStart(3, '0');
        return `Pret${newNumber}`;
    }

    async findAllLoans() {
        await this.nombreTotalPretNonPaye();
        return this.prisma.pret.findMany()
    }

    async findOneLoan(numeroPret: string) {
        return this.prisma.pret.findUnique({
            where: {numeroPret}
        })
    }

    async updateLoan(numeroPret: string, updatePretDto: UpdatePretDto) {
        const updateLoan = await this.prisma.pret.update({
            where: {numeroPret},
            data: updatePretDto
        });

        const updateLoanTypeToJSON = JSON.stringify(updateLoan);
        
        await this.historique.historiquesDesEvenements(EventType.PRET_UPDATED, updateLoan.numeroPret, updateLoanTypeToJSON)


        return updateLoanTypeToJSON;
    }

    async deleteLoan(numeroPret: string) {
        const loanToDelete = await this.prisma.pret.delete({
            where: {numeroPret}
        });

        const loanToDeleteTypeToJSON = JSON.stringify(loanToDelete);

        await this.historique.historiquesDesEvenements(EventType.PRET_DELETED, loanToDelete.numeroPret, loanToDeleteTypeToJSON)


        return loanToDeleteTypeToJSON;
    }

    async nombreTotalPretNonPaye() {

        const nombreTotalPretNonPaye = await this.prisma.pret.count({
            where: {
                restePret: {
                    gt : 0
                }
            }
        });
        console.log(nombreTotalPretNonPaye);
        const nombreTotalPretNonPayeToJSONType = JSON.stringify(nombreTotalPretNonPaye);

        return nombreTotalPretNonPayeToJSONType;
    }

    async nombreTotalPretPaye() {

        const nombreTotalPretPaye = await this.prisma.pret.count({
            where: {
                restePret: 0
            }
        });

        const nombreTotalPretPayeToJSONType = JSON.stringify(nombreTotalPretPaye);

        return nombreTotalPretPayeToJSONType;
    }

}
