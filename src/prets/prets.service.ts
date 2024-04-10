import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreatePretDto } from './dto/create-pret.dto';
import { UpdatePretDto } from './dto/update-pret.dto';

@Injectable()
export class PretsService {
    constructor(private readonly prisma: PrismaService) {}

    async createLoan(createLoan : CreatePretDto) {
        const loan = await this.prisma.pret.create({
            data: createLoan
        })

        const loanTypeToJSON = JSON.stringify(loan);

        return loanTypeToJSON;
    }

    async findAllLoans() {
        return this.prisma.pret.findMany()
    }

    async findOneLoan(numeroPret: string) {
        return this.prisma.pret.findUnique({
            where: {numeroPret}
        })
    }

    async updateLoan(numeroPret: string, updatePretDto: UpdatePretDto) {
        const updateLoan = await this.prisma.pret.update({
            where: {numeroPret},
            data: updatePretDto
        });

        const updateLoanTypeToJSON = JSON.stringify(updateLoan);

        return updateLoanTypeToJSON;
    }

    async deleteLoan(numeroPret: string) {
        const loanToDelete = await this.prisma.pret.delete({
            where: {numeroPret}
        });

        const loanToDeleteTypeToJSON = JSON.stringify(loanToDelete);

        return loanToDeleteTypeToJSON;
    }
}
