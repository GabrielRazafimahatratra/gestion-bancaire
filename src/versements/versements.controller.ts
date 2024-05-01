import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { VersementsService } from './versements.service';
import { CreateVersementsDto } from './dtos/create-versements.dto';
import { UpdateVersementsDto } from './dtos/update-versements.dto';

@Controller('versements')
export class VersementsController {

    constructor( private readonly versementService: VersementsService) {}

    @Get('search')
    async searchVersementsByClient(@Query('searchTerm') searchTerm: string) {
        return this.versementService.searchVersementsByClient(searchTerm);
    }
    
    @Get('nombreVersementParMois')
    async nombreVersementParMois() {
        return this.versementService.nombreVersementParMois();
    }


    @Post()
    async createVersement(@Body() createVersement: CreateVersementsDto) {
        return this.versementService.createVersement(createVersement); 
    }

    @Get()
    async findAllRetraits() {
        return this.versementService.findAllVersements();
    }

    @Get(':id')
    findOneRetrait(@Param('id') numeroVersement: string) {
        return this.versementService.findOneVersement(numeroVersement);
    }

    @Patch(':id')
    updateRetrait(@Param('id') numeroVersement: string, @Body() updateVersement: UpdateVersementsDto) {
        return this.versementService.updateVersement(numeroVersement, updateVersement);
    }

    @Delete(':id')
    deleteRetrait(@Param('id') numeroVersement: string) {
        return this.versementService.deleteVersement(numeroVersement);
    }

}
