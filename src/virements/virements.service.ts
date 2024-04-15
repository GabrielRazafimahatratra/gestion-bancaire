import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVirementsDto } from './dtos/create-virements.dto';
import { UpdateVirementsDtos } from './dtos/update-virements.dtos';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class VirementsService {

    constructor( private readonly prisma: PrismaService) {}

    async createVirement(createVirement: CreateVirementsDto) {

        const numeroVirementGenere = await this.genererNumeroVirement();

        const virement = await this.prisma.virement.create({
            data: {
                ...createVirement,
                numeroVirement: numeroVirementGenere
            }
        });
        
        const virementToJSONType = JSON.stringify(virement);

        await this.reduireMontantExpediteurApresVirement(
            createVirement.numeroCompteExpediteur,
            createVirement.montantVirement
        );

        await this.nouvelMontantDestinataireApresVirement(
            createVirement.numeroCompteDestinataire,
            createVirement.montantVirement
        );

        return virementToJSONType;
    }

    async reduireMontantExpediteurApresVirement(numeroCompteExpediteur: string, montantVirementEffectue: Decimal) {

        const montantVirement = parseFloat(montantVirementEffectue.toString())

        const ancienSolde = await this.prisma.client.findUnique({
            where: {numeroCompte: numeroCompteExpediteur},
            select: {montantClient: true}
        });

        const ancienSoldeExtraite = parseFloat(ancienSolde.montantClient.toString());

        const nouveauSoldeClient = ancienSoldeExtraite - montantVirement;
        
        const majSoldeClient = await this.prisma.client.update({
            where: {numeroCompte: numeroCompteExpediteur},
            data: {
                montantClient: nouveauSoldeClient
            }
        })
        const nouveauSoldeClientToJSONType = JSON.stringify(nouveauSoldeClient);
        const majSoldeClientToJSONType = JSON.stringify(majSoldeClient);

        return {
            nouveauSoldeClientToJSONType,
            majSoldeClientToJSONType
        };
    }

    async nouvelMontantDestinataireApresVirement(numeroCompteDestinataire: string, montantVirement: Decimal) {

        const ancienMontantClient = await this.prisma.client.findUnique({
            where: {numeroCompte: numeroCompteDestinataire},
            select: {montantClient: true}
        });
        
        const ancienMontant = parseFloat(ancienMontantClient.montantClient.toString());
        const montantVersementSurCompte = parseFloat(montantVirement.toString());

        const nouveauMontantClient = await this.prisma.client.update({
            where: {numeroCompte: numeroCompteDestinataire},
            data : {
                montantClient: ancienMontant + montantVersementSurCompte
            }
        });
        const nouveauMontantClientToJSONType = JSON.stringify(nouveauMontantClient);

        return nouveauMontantClientToJSONType;
    }
    
    private async genererNumeroVirement(): Promise<string> {
        const dernierVirement = await this.prisma.virement.findFirst({
            orderBy: {
                numeroVirement: 'desc',
            },
            select: {
                numeroVirement: true,
            }
        });
    
        if (!dernierVirement) { return 'Virement001';}
    
        const lastNumber = parseInt(dernierVirement.numeroVirement.slice(8),10);
        const newNumber = String(lastNumber + 1).padStart(3, '0');
        return `Virement${newNumber}`;
    }

    async findAllVirements() {
        const virement = await this.prisma.virement.findMany();
        const virementToJSONType = JSON.stringify(virement);

        return virementToJSONType;
    }

    async findOneVirement(numeroVirement: string) {
        const virement = await this.prisma.virement.findUnique({
            where: {numeroVirement: numeroVirement}
        });
        const virementToJSONType = JSON.stringify(virement);

        return virementToJSONType;
    }

    async updateVirement(numeroVirement: string, updateVirement: UpdateVirementsDtos) {
        const virement = await this.prisma.virement.update({
            where: {numeroVirement: numeroVirement},
            data: updateVirement
        });

        const virementToJSONType = JSON.stringify(virement);

        return virementToJSONType;
    }

    async deleteVirement(numeroVirement: string) {
        const virement = await this.prisma.virement.delete({
            where: {numeroVirement: numeroVirement}
        });
        
        const virementToJSONType = JSON.stringify(virement);

        return virementToJSONType;
    }
}
