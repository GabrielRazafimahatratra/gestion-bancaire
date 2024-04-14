import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { VirementsService } from './virements.service';
import { UpdateVirementsDtos } from './dtos/update-virements.dtos';
import { CreateVirementsDto } from './dtos/create-virements.dto';

@Controller('virements')
export class VirementsController {

    constructor( private readonly virementService: VirementsService) {}

    @Post()
    async createVirement(@Body() createVirement: CreateVirementsDto) {
        return this.virementService.createVirement(createVirement);
    }

    @Get()
    async findAllRetraits() {
        return this.virementService.findAllVirements();
    }

    @Get(':id')
    findOneRetrait(@Param('id') numeroVirement: string) {
        return this.virementService.findOneVirement(numeroVirement);
    }

    @Patch(':id')
    updateRetrait(@Param('id') numeroVirement: string, @Body() updateVirement: UpdateVirementsDtos) {
        return this.virementService.updateVirement(numeroVirement, updateVirement);
    }

    @Delete(':id')
    deleteRetrait(@Param('id') numeroVirement: string) {
        return this.virementService.deleteVirement(numeroVirement);
    }
}
