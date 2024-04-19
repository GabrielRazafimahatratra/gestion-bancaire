import { Controller, Get } from '@nestjs/common';
import { HistoriquesService } from './historiques.service';

@Controller('historiques')
export class HistoriquesController {
    constructor( private readonly historiqueService: HistoriquesService) {}

    @Get()
    getAllEvents() {
        return this.historiqueService.findAllEvents();
    }
}
