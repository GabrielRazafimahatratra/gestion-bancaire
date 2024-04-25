import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}


  
  @Get('search')
  async searchClient(@Query('searchTerm') searchTerm: string) {
      return this.clientsService.searchClients(searchTerm);
  }

  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientsService.createClient(createClientDto);
  }

  @Get()
  findAll() {
    return this.clientsService.findAllClients();
  }

  @Get(':id')
  findOne(@Param('id') numeroCompte: string) {
    return this.clientsService.findOneClient(numeroCompte);
  }

  @Patch(':id')
  update(@Param('id') numeroCompte: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientsService.updateClient(numeroCompte, updateClientDto);
  }

  @Delete(':id')
  remove(@Param('id') numeroCompte: string) {
    return this.clientsService.removeClient(numeroCompte);
  }
}
