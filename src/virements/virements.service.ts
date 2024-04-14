import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateVirementsDto } from './dtos/create-virements.dto';
import { UpdateVirementsDtos } from './dtos/update-virements.dtos';

@Injectable()
export class VirementsService {

    constructor( private readonly prisma: PrismaService) {}

    async createVirement(createVirement: CreateVirementsDto) {
        const virement = await this.prisma.virement.create({
            data: createVirement
        });
        
        const virementToJSONType = JSON.stringify(virement);

        return virementToJSONType;
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
