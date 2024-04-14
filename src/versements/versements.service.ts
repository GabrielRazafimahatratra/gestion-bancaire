import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVersementsDto } from './dtos/create-versements.dto';
import { UpdateVersementsDto } from './dtos/update-versements.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class VersementsService {

    constructor( private readonly prisma: PrismaService) {}

    async createVersement(createVersement: CreateVersementsDto) {
        const versement = await this.prisma.versement.create({
            data: createVersement
        });
        
        const versementToJSONType = JSON.stringify(versement);

        await this.nouvelMontantClientApresVersement(
            createVersement.numeroCompteVersement,
            createVersement.montantVersement
        );

        return versementToJSONType;
    }

    async nouvelMontantClientApresVersement(numeroCompteClient: string, montantVersement: Decimal) {

        const ancienMontantClient = await this.prisma.client.findUnique({
            where: {numeroCompte: numeroCompteClient},
            select: {montantClient: true}
        });
        
        const ancienMontant = parseFloat(ancienMontantClient.montantClient.toString());
        const montantVersementSurCompte = parseFloat(montantVersement.toString());

        const nouveauMontantClient = await this.prisma.client.update({
            where: {numeroCompte: numeroCompteClient},
            data : {
                montantClient: ancienMontant + montantVersementSurCompte
            }
        });
        const nouveauMontantClientToJSONType = JSON.stringify(nouveauMontantClient);

        return nouveauMontantClientToJSONType;
    }

    async findAllVersements() {
        const versement = await this.prisma.versement.findMany();
        const versementToJSONType = JSON.stringify(versement);

        return versementToJSONType;
    }

    async findOneVersement(numeroVersement: string) {
        const versement = await this.prisma.versement.findUnique({
            where: {numeroVersement: numeroVersement}
        });
        const versementToJSONType = JSON.stringify(versement);

        return versementToJSONType;
    }

    async updateVersement(numeroVersement: string, updateVersement: UpdateVersementsDto) {
        const versement = await this.prisma.versement.update({
            where: {numeroVersement: numeroVersement},
            data: updateVersement
        });

        const versementToJSONType = JSON.stringify(versement);

        return versementToJSONType;
    }

    async deleteVersement(numeroVersement: string) {
        const versement = await this.prisma.versement.delete({
            where: {numeroVersement: numeroVersement}
        });
        
        const versementToJSONType = JSON.stringify(versement);

        return versementToJSONType;
    }
}
