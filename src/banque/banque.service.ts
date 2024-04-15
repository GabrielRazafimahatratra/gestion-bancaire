import { Injectable } from '@nestjs/common';
import { CreateBanqueDto } from './dto/create.banque.dto';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateBanqueDto } from './dto/update.banque.dto';

@Injectable()
export class BanqueService {
    constructor(private readonly prisma: PrismaService) {}

    async createBank(createBank: CreateBanqueDto) {

        const genererBankIdentifierCode = await this.genererBankIdentifierCode();

        const bank = await this.prisma.banque.create({
            data: {
                ...createBank,
                bankIdentifierCode: genererBankIdentifierCode
            }
        });

        const BankToJSONType = JSON.stringify(bank);

        return BankToJSONType;
    }

    private async genererBankIdentifierCode(): Promise<string> {
        const lastBank = await this.prisma.banque.findFirst({
            orderBy: {
                bankIdentifierCode: 'desc',
            },
            select: {
                bankIdentifierCode: true,
            }
        });

        if (!lastBank) { return 'Bank001';}

        const lastNumber = parseInt(lastBank.bankIdentifierCode.slice(4),10);
        const newNumber = String(lastNumber + 1).padStart(3, '0');
        return `Bank${newNumber}`;
    }

    async findAllBanks() {
        const banks = await this.prisma.banque.findMany();
        const banksToJSONType = JSON.stringify(banks);

        return banksToJSONType; 
    }

    async findOneBank(bankIdentifierCode: string) {
        const oneBank = await this.prisma.banque.findUnique({
            where: {bankIdentifierCode}
        });
        const oneBankToJSONType = JSON.stringify(oneBank);

        return oneBankToJSONType;
    }

    async updateBank(bankIdentifierCode: string, updateBank: UpdateBanqueDto) {
        const bank = await this.prisma.banque.update({
            where: {bankIdentifierCode},
            data: updateBank
        });

        const bankToJSONType = JSON.stringify(bank);

        return bankToJSONType;
    }

    deleteBank(bankIdentifierCode: string) {
        return this.prisma.banque.delete({
            where: {bankIdentifierCode}
        });
    }
}
