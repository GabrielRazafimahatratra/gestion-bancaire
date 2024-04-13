import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePretDto } from './dto/create-pret.dto';
import { UpdatePretDto } from './dto/update-pret.dto';

@Injectable()
export class PretsService {
    constructor(private readonly prisma: PrismaService) {}

    async createLoan(createLoan : CreatePretDto) {

        const tauxPret = parseFloat(createLoan.tauxPret.toString());
        const montantPret = parseFloat(createLoan.montantPret.toString());

         const calculMontantARendre = tauxPret * montantPret;

        const loan = await this.prisma.pret.create({
            data: {
                ...createLoan,
                montantARendre: calculMontantARendre,
                restePret: calculMontantARendre
                
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

    async findAllLoans() {
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

    // async rendrePret(numeroPret: string, montantAPayer: Decimal,  updateLoan: UpdatePretDto) {

    //     console.log(montantAPayer);
        
    //     const montantPretAPayer = parseFloat(montantAPayer.toString())
    //     console.log(montantPretAPayer);
    //     const montantARendreData = await this.prisma.pret.findUnique({
    //         where: {numeroPret},
    //         select: {montantARendre:true}
    //     });

    //     const valeurMontantPretARendre = montantARendreData.montantARendre;
    //     const valeurMontantConverti = parseFloat(valeurMontantPretARendre.toString())
    //     console.log(valeurMontantPretARendre)
        
    //     const montantReste = valeurMontantConverti - montantPretAPayer;

    //     const nouveauPret = await this.prisma.pret.update({
    //         where: {numeroPret},
    //         data: {
    //             ...updateLoan,
    //             montantARendre: montantReste
    //         }
    //     });

    //     const nouveauPretTypeToJSON = JSON.stringify(nouveauPret)

    //     return nouveauPretTypeToJSON;
    // }

    // async montantTotalNonPaye() {}

    // async montantTotalPaye() {}

}
