import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { RetraitsService } from './retraits.service';
import { CreateRetraitsDto } from './dtos/create-retraits.dto';
import { UpdateRetraitsDto } from './dtos/update-retraits.dto';

@Controller('retraits')
export class RetraitsController {
    constructor( private readonly retraitsService: RetraitsService) {}

    @Post('search')
    async searchRetraitsByClient(@Query('searchTerm') searchTerm: string) {
        return this.retraitsService.searchRetraitsByClient(searchTerm);
    }


    @Post()
    async createRetrait(@Body() createRetrait: CreateRetraitsDto) {
        return this.retraitsService.createRetrait(createRetrait); 
    }

    @Get()
    async findAllRetraits() {
        return this.retraitsService.findAllRetraits();
    }

    @Get(':id')
    findOneRetrait(@Param('id') numeroRetrait: string) {
        return this.retraitsService.findOneRetrait(numeroRetrait);
    }

    @Patch(':id')
    updateRetrait(@Param('id') numeroRetrait: string, @Body() updateRetrait: UpdateRetraitsDto) {
        return this.retraitsService.updateRetrait(numeroRetrait, updateRetrait);
    }

    @Delete(':id')
    deleteRetrait(@Param('id') numeroRetrait: string) {
        return this.retraitsService.deleteRetrait(numeroRetrait);
    }

}
