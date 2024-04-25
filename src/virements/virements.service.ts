import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVirementsDto } from './dtos/create-virements.dto';
import { UpdateVirementsDtos } from './dtos/update-virements.dtos';
import { Decimal } from '@prisma/client/runtime/library';
import { HistoriquesService } from 'src/historiques/historiques.service';
import { EventType } from 'src/historiques/event-type';
import { MyemailService } from 'src/myemail/myemail.service';

@Injectable()
export class VirementsService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly historique: HistoriquesService,
        private readonly myEmailService: MyemailService
    ) {}

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

        await this.historique.historiquesDesEvenements(EventType.VIREMENT_CREATED, virement.numeroVirement, virementToJSONType);

        const emailClientAPartirDuNumeroCompte = await this.prisma.virement.findUnique({
            where: {
                numeroVirement: virement.numeroVirement,
                numeroCompteExpediteur: virement.numeroCompteExpediteur
            },
            select: {
                clientExpediteur: {
                    select: { emailClient: true}
                }
            }
        }).then(result => result?.clientExpediteur.emailClient);

        await this.myEmailService.sendEmailForVirement(
            virement.numeroVirement,
            virement.numeroCompteDestinataire,
            virement.numeroCompteExpediteur,
            virement.montantVirement,
            virement.dateVirement,
            emailClientAPartirDuNumeroCompte
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
        const updatedVirement = await this.prisma.virement.update({
            where: {numeroVirement: numeroVirement},
            data: updateVirement
        });

        const updatedVirementToJSONType = JSON.stringify(updatedVirement);

        await this.historique.historiquesDesEvenements(EventType.VIREMENT_UPDATED, updatedVirement.numeroVirement, updatedVirementToJSONType)


        return updatedVirementToJSONType;
    }

    async deleteVirement(numeroVirement: string) {
        const deletedVirement = await this.prisma.virement.delete({
            where: {numeroVirement: numeroVirement}
        });
        
        const deletedVirementToJSONType = JSON.stringify(deletedVirement);

        await this.historique.historiquesDesEvenements(EventType.VIREMENT_DELETED, deletedVirement.numeroVirement, deletedVirementToJSONType)


        return deletedVirementToJSONType;
    }

    async searchVirementsByClient(searchTerm: string) {
        const virements = await this.prisma.virement.findMany({
            where: {
                OR: [
                    {
                        clientExpediteur: {
                            OR: [
                                { nomClient: {contains: searchTerm, mode: 'insensitive'}},
                                { prenomsClient: {contains: searchTerm, mode: 'insensitive'}},
                                { telephoneClient: {contains: searchTerm, mode: 'insensitive'}},
                            ]
                        },
                        clientDestinataire: {
                            OR: [
                                { nomClient: {contains: searchTerm, mode: 'insensitive'}},
                                { prenomsClient: {contains: searchTerm, mode: 'insensitive'}},
                                { telephoneClient: {contains: searchTerm, mode: 'insensitive'}},
                            ]
                        }
                    }
                    
                ]
                
            },
            include: { 
                clientDestinataire: true,
                clientExpediteur: true
            }
        });

        const virementsToJSONType = JSON.stringify(virements);
        return virementsToJSONType;
    }

}
