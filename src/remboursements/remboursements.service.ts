import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRemboursementsDto } from './dto/create-remboursements.dto';
import { UpdateRemboursementsDto } from './dto/update-remboursement.dto';

@Injectable()
export class RemboursementsService {
    constructor(private readonly prisma: PrismaService) {}

    async createRemboursement(createRemboursement: CreateRemboursementsDto) {

        const idRemboursementGenere = await this.genererIdRemboursement();

        const remboursement = await this.prisma.remboursementPret.create({
            data: {
                ...createRemboursement,
                idRemboursement: idRemboursementGenere
            }
        });

        const numeroPretAPartirRemboursement = createRemboursement.numeroPret;
        const montantPret = await this.prisma.pret.findUnique({
            where: {numeroPret: numeroPretAPartirRemboursement},
            select: {montantARendre: true}
        });

        const valeurPret = parseFloat(montantPret.montantARendre.toString());
        const montantAPayer = parseFloat(remboursement.montantAPayer.toString());
        const montantReste = valeurPret - montantAPayer;

       
        const nouvelleValeurPret = await this.prisma.pret.update({
            where: {numeroPret: numeroPretAPartirRemboursement},
            data: {
                restePret: montantReste
            }
        });

        const remboursementToJSONType = JSON.stringify(remboursement);
        const nouvelleValeurPretToJSONType = JSON.stringify(nouvelleValeurPret)

        const ancienSoldeBanque = await this.prisma.banque.findUnique({
            where: {numeroCompteBanque: remboursement.numeroCompteDeLaBanque}
        });

        const ancienSoldeBanqueValeur = parseFloat(ancienSoldeBanque.soldeBanque.toString());
        const ancienSoldeParRemboursement = parseFloat(ancienSoldeBanque.soldePayeParRemboursements.toString());

        const soldeParRemboursement = await this.prisma.banque.update({
            where: {numeroCompteBanque: remboursement.numeroCompteDeLaBanque },
            data: {
                soldeBanque: valeurPret + ancienSoldeBanqueValeur,
                soldePayeParRemboursements: montantAPayer + ancienSoldeParRemboursement
            }
        });

        return {
            remboursementToJSONType,
            nouvelleValeurPretToJSONType,
            soldeParRemboursement
        };
    }

    private async genererIdRemboursement(): Promise<string> {
        const dernierRemboursement = await this.prisma.remboursementPret.findFirst({
            orderBy: {
                idRemboursement: 'desc',
            },
            select: {
                idRemboursement: true,
            }
        });
    
        if (!dernierRemboursement) { return 'Remboursement001';}
    
        const lastNumber = parseInt(dernierRemboursement.idRemboursement.slice(13),10);
        const newNumber = String(lastNumber + 1).padStart(3, '0');
        return `Remboursement${newNumber}`;
    }

    async findAllRemboursements() {
        const remboursements = await this.prisma.remboursementPret.findMany();

        return remboursements;
    }

    async findOneRemboursemen(idRemboursement: string) {
        const remboursement = await this.prisma.remboursementPret.findUnique({
            where: {idRemboursement}
        });

        const remboursementToJSONType = JSON.stringify(remboursement);

        return remboursementToJSONType;
    }

    async updateRemboursement(idRemboursement: string, updateRemboursement: UpdateRemboursementsDto) {
        const remboursement = await this.prisma.remboursementPret.update({
            where: {idRemboursement},
            data: updateRemboursement
        });

        const remboursementToJSONType = JSON.stringify(remboursement);

        return remboursementToJSONType;
    }
    
    async deleteRemboursement(idRemboursement: string) {
        const remboursement =await this.prisma.remboursementPret.delete({
            where: {idRemboursement}
        });

        const remboursementToJSONType = JSON.stringify(remboursement);

        return remboursementToJSONType;
    }
}
