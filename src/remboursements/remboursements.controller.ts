import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { RemboursementsService } from './remboursements.service';
import { CreateRemboursementsDto } from './dto/create-remboursements.dto';
import { UpdateRemboursementsDto } from './dto/update-remboursement.dto';

@Controller('remboursements')
export class RemboursementsController {
    constructor(private readonly remboursementService: RemboursementsService) {}

    @Post()
    async createRemboursement(@Body() createRemboursement: CreateRemboursementsDto){
        return this.remboursementService.createRemboursement(createRemboursement);
    }

    @Get()
    async findAllRemboursement() {
        return this.remboursementService.findAllRemboursements();
    }

    @Get(':id')
    async findOneRemboursement(@Param('id') idRemboursement: string) {
        return this.remboursementService.findOneRemboursemen(idRemboursement);
    }

    @Patch(':id')
    async updateRemboursement(@Param('id') idRemboursement: string, @Body() updateRemboursement: UpdateRemboursementsDto) {
        return this.remboursementService.updateRemboursement(idRemboursement, updateRemboursement);
    }

    @Delete(':id')
    async deleteRemboursement(@Param('id') idRemboursement: string) {
        return this.remboursementService.deleteRemboursement(idRemboursement);
    }
}
