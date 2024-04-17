import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CaissiersService } from './caissiers.service';
import { CreateCaissierDto } from './dto/create-caissier.dto';
import { UpdateCaissierDto } from './dto/update-caissier.dto';

@Controller('caissiers')
export class CaissiersController {
    constructor(private readonly cashierService: CaissiersService) {}
    
    @Get('email/:id')
    findOneCashierByEmail(@Param('id') email: string) {
      return this.cashierService.findOneCashierByEmail(email);
    }

    @Post()
    create(@Body() createCashierDto: CreateCaissierDto) {
      return this.cashierService.createCashiers(createCashierDto)
    }
  
    @Get()
    findAll() {
      return this.cashierService.findAllCashiers();
    }
  
    @Get(':id')
    findOne(@Param('id') numeroCaissier: string) {
      return this.cashierService.findOneCashier(numeroCaissier);
    }

  
    @Patch(':id')
    update(@Param('id') numeroCaissier: string, @Body() updateCashierDto: UpdateCaissierDto) {
      return this.cashierService.updateCashier(numeroCaissier, updateCashierDto);
    }
  
    @Delete(':id')
    remove(@Param('id') numeroCaissier: string) {
      return this.cashierService.removeCashier(numeroCaissier);
    } 
}
