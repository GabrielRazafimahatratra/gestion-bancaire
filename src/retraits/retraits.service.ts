import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRetraitsDto } from './dtos/create-retraits.dto';
import { UpdateRetraitsDto } from './dtos/update-retraits.dto';
import { Decimal } from '@prisma/client/runtime/library';
import { HistoriquesService } from 'src/historiques/historiques.service';
import { EventType } from 'src/historiques/event-type';
import { MyemailService } from 'src/myemail/myemail.service';
import { error } from 'console';

@Injectable()
export class RetraitsService {

    constructor(
        private readonly prisma: PrismaService,
        private readonly historique: HistoriquesService,
        private readonly myEmailService: MyemailService

    ) {}

    async createRetrait(createRetrait: CreateRetraitsDto) {

        const client = await this.prisma.client.findUnique({
            where: { numeroCompte: createRetrait.numeroCompte },
            select: { montantClient: true}
        });

        if (!client) { throw new Error("Client non trouvé"); }

        const montantClient = parseFloat(client.montantClient.toString())
        const montantRetrait = parseFloat(createRetrait.montantRetrait.toString())

        if (montantRetrait < montantClient) {

            const numeroRetraitGenere = await this.genererNumeroRetrait();
    
            const retrait = await this.prisma.retrait.create({
                data: {
                    ...createRetrait,
                    numeroRetraits: numeroRetraitGenere
                }
            });
            
            const retraitToJSONType = JSON.stringify(retrait);
            
            
            
            
            await this.reduireMontantApresRetrait(
                createRetrait.numeroCompte,
                createRetrait.montantRetrait
            );
            
            await this.historique.historiquesDesEvenements(EventType.RETRAIT_CREATED, retrait.numeroRetraits, retraitToJSONType);
            
            
            const emailClientAPartirDuNumeroCompte = await this.prisma.retrait.findUnique({
                where: {
                    numeroRetraits: retrait.numeroRetraits,
                    numeroCompte: retrait.numeroCompte
                },
                select: {
                    retraitClient: {
                        select: { emailClient: true }
                    }
                }
            }).then( result => result?.retraitClient.emailClient);
            
            await this.myEmailService.sendEmailForRetrait(
                retrait.numeroRetraits,
                retrait.numeroCompte,
                retrait.montantRetrait,
                retrait.dateRetrait,
                emailClientAPartirDuNumeroCompte
            );
            
            
            return retraitToJSONType;
        }
        else {
            return JSON.stringify("Solde insuffisant pour le retrait");
        }
    }


    async reduireMontantApresRetrait(numeroCompteClient: string, montantPretRetire: Decimal) {

        const montantPret = parseFloat(montantPretRetire.toString())

        const ancienSolde = await this.prisma.client.findUnique({
            where: {numeroCompte: numeroCompteClient},
            select: {montantClient: true}
        });

        const ancienSoldeExtraite = parseFloat(ancienSolde.montantClient.toString());

        const nouveauSoldeClient = ancienSoldeExtraite - montantPret;
        
        const majSoldeClient = await this.prisma.client.update({
            where: {numeroCompte: numeroCompteClient},
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

    private async genererNumeroRetrait(): Promise<string> {
        const dernierRetrait = await this.prisma.retrait.findFirst({
            orderBy: {
                numeroRetraits: 'desc',
            },
            select: {
                numeroRetraits: true,
            }
        });
    
        if (!dernierRetrait) { return 'Retrait001';}
    
        const lastNumber = parseInt(dernierRetrait.numeroRetraits.slice(7),10);
        const newNumber = String(lastNumber + 1).padStart(3, '0');
        return `Retrait${newNumber}`;
    }

    async findAllRetraits() {
        const retraits = await this.prisma.retrait.findMany();
        const retraitsToJSONType = JSON.stringify(retraits);

        return retraitsToJSONType;
    }

    async findOneRetrait(numeroRetrait: string) {
        const retrait = await this.prisma.retrait.findUnique({
            where: {numeroRetraits: numeroRetrait}
        });
        const retraitToJSONType = JSON.stringify(retrait);

        return retraitToJSONType;
    }

    async updateRetrait(numeroRetrait: string, updateRetrait: UpdateRetraitsDto) {
        const updatedRetrait = await this.prisma.retrait.update({
            where: {numeroRetraits: numeroRetrait},
            data: updateRetrait
        });

        const updatedRetraitToJSONType = JSON.stringify(updatedRetrait);

        await this.historique.historiquesDesEvenements(EventType.RETRAIT_UPDATED, updatedRetrait.numeroRetraits, updatedRetraitToJSONType)


        return updatedRetraitToJSONType;
    }

    async deleteRetrait(numeroRetrait: string) {
        const deletedRetrait = await this.prisma.retrait.delete({
            where: {numeroRetraits: numeroRetrait}
        });
        
        const deletedRetraitToJSONType = JSON.stringify(deletedRetrait);

        await this.historique.historiquesDesEvenements(EventType.RETRAIT_DELETED, deletedRetrait.numeroRetraits, deletedRetraitToJSONType)

        return deletedRetraitToJSONType;
    }


    async searchRetraitsByClient(searchTerm: string) {
        const retrait = await this.prisma.retrait.findMany({
            where: {
                OR: [
                    {
                        retraitClient: {
                            OR: [
                                { nomClient: {contains: searchTerm, mode: 'insensitive'}},
                                { prenomsClient: {contains: searchTerm, mode: 'insensitive'}},
                                { telephoneClient: {contains: searchTerm, mode: 'insensitive'}},
                            ]
                        }
                    }
                  
                ]
                
            },
            include: { retraitClient: true }
        });

        const retraitsToJSONType = JSON.stringify(retrait);
        return retraitsToJSONType;
    }


}
