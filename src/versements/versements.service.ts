import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVersementsDto } from './dtos/create-versements.dto';
import { UpdateVersementsDto } from './dtos/update-versements.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { HistoriquesService } from 'src/historiques/historiques.service';
import { EventType } from 'src/historiques/event-type';
import { MyemailService } from 'src/myemail/myemail.service';

@Injectable()
export class VersementsService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly historique: HistoriquesService,
        private readonly envoiEmail: MyemailService
    ) {}

    async createVersement(createVersement: CreateVersementsDto) {

        const numeroVersementGenere = await this.genererNumeroVersement();

        const versement = await this.prisma.versement.create({
            data: {
                ...createVersement,
                numeroVersement: numeroVersementGenere
            }
        });
        
        const versementToJSONType = JSON.stringify(versement);

        await this.nouvelMontantClientApresVersement(
            createVersement.numeroCompteVersement,
            createVersement.montantVersement
        );

        await this.historique.historiquesDesEvenements(EventType.VERSEMENT_CREATED, versement.numeroVersement, versementToJSONType);
        
        const emailClientAPartirDuNumeroCompte = await this.prisma.versement.findUnique({
            where: {
                numeroVersement: versement.numeroVersement,
                numeroCompteVersement: versement.numeroCompteVersement
            },
            select: {
                versementsClient: {
                    select: { emailClient: true }
                }
            }
        }).then(result => result?.versementsClient.emailClient);
        
        await this.envoiEmail.sendEmailForVersements(
            versement.numeroVersement,
            versement.numeroCompteVersement,
            versement.montantVersement,
            versement.dateVersement,
            versement.nomVerseur,
            versement.prenomsVerseur,
            emailClientAPartirDuNumeroCompte
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

    private async genererNumeroVersement(): Promise<string> {
        const dernierVersement = await this.prisma.versement.findFirst({
            orderBy: {
                numeroVersement: 'desc',
            },
            select: {
                numeroVersement: true,
            }
        });
    
        if (!dernierVersement) { return 'Versement001';}
    
        const lastNumber = parseInt(dernierVersement.numeroVersement.slice(9),10);
        const newNumber = String(lastNumber + 1).padStart(3, '0');
        return `Versement${newNumber}`;
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
        const updatedVersement = await this.prisma.versement.update({
            where: {numeroVersement: numeroVersement},
            data: updateVersement
        });

        const updatedVersementToJSONType = JSON.stringify(updatedVersement);

        await this.historique.historiquesDesEvenements(EventType.VERSEMENT_UPDATED, updatedVersement.numeroVersement, updatedVersementToJSONType)


        return updatedVersementToJSONType;
    }

    async deleteVersement(numeroVersement: string) {
        const deletedVersement = await this.prisma.versement.delete({
            where: {numeroVersement: numeroVersement}
        });
        
        const deletedVersementToJSONType = JSON.stringify(deletedVersement);

        await this.historique.historiquesDesEvenements(EventType.VERSEMENT_DELETED, deletedVersement.numeroVersement, deletedVersementToJSONType)


        return deletedVersementToJSONType;
    }

    async nombreVersementParMois() {
        const versementParMois = await this.prisma.versement.groupBy({
            by: ['dateVersement'],
            _count: {
                numeroVersement: true,
            },
            orderBy: {
                dateVersement: 'desc'
            }
        });

        const versementParMoisToJSONType = JSON.stringify(versementParMois);

        return versementParMoisToJSONType;
    }


    async searchVersementsByClient(searchTerm: string) {
        const versements = await this.prisma.versement.findMany({
            where: {
                OR: [
                    {
                        versementsClient: {
                            OR: [
                                { nomClient: {contains: searchTerm, mode: 'insensitive'}},
                                { prenomsClient: {contains: searchTerm, mode: 'insensitive'}},
                                { telephoneClient: {contains: searchTerm, mode: 'insensitive'}},
                            ]
                        }
                    },
                    { nomVerseur: {contains: searchTerm, mode: 'insensitive'}},
                    { prenomsVerseur: {contains: searchTerm, mode: 'insensitive'}}
                ]
                
            },
            include: { versementsClient: true }
        });

        const versmentsToJSONType = JSON.stringify(versements);
        return versmentsToJSONType;
    }
}
