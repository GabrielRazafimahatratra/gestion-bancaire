import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePretDto } from './dto/create-pret.dto';
import { UpdatePretDto } from './dto/update-pret.dto';

@Injectable()
export class PretsService {
    constructor(private readonly prisma: PrismaService) {}

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

        return updateLoanTypeToJSON;
    }

    async deleteLoan(numeroPret: string) {
        const loanToDelete = await this.prisma.pret.delete({
            where: {numeroPret}
        });

        const loanToDeleteTypeToJSON = JSON.stringify(loanToDelete);

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
