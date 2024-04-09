import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Client } from '@prisma/client';

@Injectable()
export class ClientsService {

  constructor(private readonly prisma: PrismaService) {}

  createClient(createClientDto: CreateClientDto): Promise<Client> {
    return this.prisma.client.create({
      data: createClientDto
    });
  }

  findAllClients(): Promise<Client[]> {
    return this.prisma.client.findMany();
  }

  findOneClient(numeroCompte: string): Promise<Client | null> {
    return this.prisma.client.findUnique({
      where: {numeroCompte}
    });
  }

  updateClient(numeroCompte: string, updateClientDto: UpdateClientDto): Promise<Client> {
    return this.prisma.client.update({
      where: {numeroCompte},
      data: updateClientDto
    });
  }

  removeClient(numeroCompte: string): Promise<Client> {
    return this.prisma.client.delete({
      where: {numeroCompte}
    });
  }
}
