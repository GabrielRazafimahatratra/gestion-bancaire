import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRemboursementsDto } from './dto/create-remboursements.dto';
import { UpdateRemboursementsDto } from './dto/update-remboursement.dto';

@Injectable()
export class RemboursementsService {
    constructor(private readonly prisma: PrismaService) {}

    async createRemboursement(createRemboursement: CreateRemboursementsDto) {
        const remboursement = await this.prisma.remboursementPret.create({
            data: createRemboursement
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

        return {
            remboursementToJSONType,
            nouvelleValeurPretToJSONType
        };
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
