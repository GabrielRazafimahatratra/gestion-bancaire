import { Controller, Delete, Param, Patch, Post, Get, Body } from '@nestjs/common';
import { PretsService } from './prets.service';
import { CreatePretDto } from './dto/create-pret.dto';
import { UpdatePretDto } from './dto/update-pret.dto';
import { Decimal } from '@prisma/client/runtime/library';

@Controller('prets')
export class PretsController {
    constructor(private readonly pretsService: PretsService) {}

    @Patch('/rendrePret/:id')
    rendrePret(@Param('id') numeroPret: string, @Body() montantApayer: Decimal, updateLoan: UpdatePretDto) {
        return this.pretsService.rendrePret(numeroPret, montantApayer, updateLoan)
    }

    @Post()
    createLoan(@Body() createLoan: CreatePretDto) {
        return this.pretsService.createLoan(createLoan);
    }

    @Get()
    findAllLoan() {
        return this.pretsService.findAllLoans();
    }

    @Get(':id')
    findOneLoan(@Param('id') numeroPret: string) {
        return this.pretsService.findOneLoan(numeroPret);
    }

    @Patch(':id')
    updateLoan(@Param('id') numeroPret: string, @Body() updateLoan: UpdatePretDto) {
        return this.pretsService.updateLoan(numeroPret, updateLoan);
    }

    @Delete(':id')
    deleteLoan(@Param('id') numeroPret: string) {
        return this.pretsService.deleteLoan(numeroPret);
    }

}
