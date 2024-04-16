import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { EventType } from './event-type';

@Injectable()
export class HistoriquesService {

    constructor( private readonly prisma: PrismaService) {}

    async historiquesDesEvenements(type: EventType, idOfType: string, data: any) {

        const identifiantHistorique = await this.genererIdHistorique();

        const historique = await this.prisma.historique.create({
            data: {
                type,
                identifiantOfType: idOfType,
                donnee: JSON.stringify(data),
                idHistorique : identifiantHistorique
            }
        });

        const historiqueToJSONType = JSON.stringify(historique);

        return historiqueToJSONType;
    }

    private async genererIdHistorique(): Promise<string> {
        const dernierHistorique = await this.prisma.historique.findFirst({
            orderBy: {
                idHistorique: 'desc',
            },
            select: {
                idHistorique: true,
            }
        });

        if (!dernierHistorique) { return 'Historique001';}

        const lastNumber = parseInt(dernierHistorique.idHistorique.slice(10),10);
        const newNumber = String(lastNumber + 1).padStart(3, '0');
        return `Historique${newNumber}`;
    }

}
