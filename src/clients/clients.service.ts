import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'prisma/prisma.service';
import { HistoriquesService } from 'src/historiques/historiques.service';
import { EventType } from 'src/historiques/event-type';

@Injectable()
export class ClientsService {

  constructor(
    private readonly prisma: PrismaService,
    private readonly historique : HistoriquesService

  ) {}


  async createClient(createClientDto: CreateClientDto){

    const numeroCompteClient = await this.genererCompteClient(); 

    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        numeroCompte: numeroCompteClient
      }
    });
    const clientTypeToJSON = JSON.stringify(client)

    await this.historique.historiquesDesEvenements(EventType.CLIENT_CREATED, client.numeroCompte, clientTypeToJSON)

    return clientTypeToJSON
  }

  private async genererCompteClient(): Promise<string> {

    const lastClient = await this.prisma.client.findFirst({
      orderBy: {numeroCompte: 'desc'}
    });

    let newAccountNumber = '00086-';
    let middleNumber = 1;
    if (lastClient) {
      const lastAccountNumber = lastClient.numeroCompte;
      const lastMiddleNumber = parseInt(lastAccountNumber.substring(6, 16));
      if (!isNaN(lastMiddleNumber)) {
      middleNumber = lastMiddleNumber + 1;
      }
    }

    newAccountNumber += middleNumber.toString().padStart(10, '0') + '-81';

    return newAccountNumber;
  }

  async findAllClients() {
    return this.prisma.client.findMany();
  }

  findOneClient(numeroCompte: string){
    return this.prisma.client.findUnique({
      where: {numeroCompte}
    });
  }

  async updateClient(numeroCompte: string, updateClientDto: UpdateClientDto): Promise<string> {
    
    const updateClient = await this.prisma.client.update({
      where: {numeroCompte},
      data: updateClientDto
    });

    const updateClientTypeToJSON = JSON.stringify(updateClient);

    await this.historique.historiquesDesEvenements(EventType.CLIENT_UPDATED, updateClient.numeroCompte, updateClientTypeToJSON)


    return updateClientTypeToJSON;
  }

  async removeClient(numeroCompte: string): Promise<string> {
    const deletedClient = await this.prisma.client.delete({
      where: {numeroCompte}
    });

    const deletedClientTypeToJSON = JSON.stringify(deletedClient);

    await this.historique.historiquesDesEvenements(EventType.CLIENT_DELETED, deletedClient.numeroCompte, deletedClientTypeToJSON)


    return deletedClientTypeToJSON;

  }

  async searchClients(searchTerm: string) {
    const clients = await this.prisma.client.findMany({
      where: {
        OR: [
          { nomClient: { contains: searchTerm, mode: 'insensitive' } },
          { prenomsClient: { contains: searchTerm, mode: 'insensitive' } },
          { numeroCompte: { contains: searchTerm, mode: 'insensitive' } },
          { telephoneClient: { contains: searchTerm, mode: 'insensitive' } },
          { emailClient: { contains: searchTerm, mode: 'insensitive' } },
        ],
      },
    });
    
    const clientsToJSONType = JSON.stringify(clients);

    return clientsToJSONType;
  }


}
