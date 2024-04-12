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

        const remboursementToJSONType = JSON.stringify(remboursement);

        return remboursementToJSONType;
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
