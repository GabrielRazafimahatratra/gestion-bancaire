import { Controller, Delete, Get, Patch, Post,Body, Param } from '@nestjs/common';
import { BanqueService } from './banque.service';
import { CreateBanqueDto } from './dto/create.banque.dto';
import { UpdateBanqueDto } from './dto/update.banque.dto';

@Controller('banque')
export class BanqueController {

    constructor(private readonly bankService: BanqueService) {}

    @Post()
    async createBank(@Body() createBank: CreateBanqueDto) {
        return this.bankService.createBank(createBank)
    }

    @Get()
    async findAllBanks() {
        return this.bankService.findAllBanks();
    }

    @Get(':id')
    async findOneBank(@Param('id') bankIdentifierCode: string) {
        return this.bankService.findOneBank(bankIdentifierCode);
    }

    @Patch(':id')
    async updateBank(@Param('id') bankIdentifierCode: string, @Body() updateBank: UpdateBanqueDto) {
        return this.bankService.updateBank(bankIdentifierCode, updateBank);
    }

    @Delete(':id')
    async deleteBank(@Param('id') bankIdentifierCode: string) {
        return this.bankService.deleteBank(bankIdentifierCode);
    }
}
