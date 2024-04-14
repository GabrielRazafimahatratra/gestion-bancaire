import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateRetraitsDto } from './dtos/create-retraits.dto';
import { UpdateRetraitsDto } from './dtos/update-retraits.dto';

@Injectable()
export class RetraitsService {

    constructor(private readonly prisma: PrismaService) {}

    async createRetrait(createRetrait: CreateRetraitsDto) {
        const retrait = await this.prisma.retrait.create({
            data: createRetrait
        });
        
        const retraitToJSONType = JSON.stringify(retrait);

        return retraitToJSONType;
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
        const retrait = await this.prisma.retrait.update({
            where: {numeroRetraits: numeroRetrait},
            data: updateRetrait
        });

        const retraitToJSONType = JSON.stringify(retrait);

        return retraitToJSONType;
    }

    async deleteRetrait(numeroRetrait: string) {
        const retrait = await this.prisma.retrait.delete({
            where: {numeroRetraits: numeroRetrait}
        });
        
        const retraitToJSONType = JSON.stringify(retrait);

        return retraitToJSONType;
    }
}
