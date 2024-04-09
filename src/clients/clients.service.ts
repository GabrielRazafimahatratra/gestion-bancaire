import { Injectable } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class ClientsService {

  constructor(private readonly prisma: PrismaService) {}

  async createClient(createClientDto: CreateClientDto){

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

    const client = await this.prisma.client.create({
      data: {
        ...createClientDto,
        numeroCompte: newAccountNumber
      }
    });
    const clientTypeToJSON = JSON.stringify(client)
    
    return clientTypeToJSON
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

    return updateClientTypeToJSON;
  }

  async removeClient(numeroCompte: string): Promise<string> {
    const deletedClient = await this.prisma.client.delete({
      where: {numeroCompte}
    });

    const deletedClientTypeToJSON = JSON.stringify(deletedClient)

    return deletedClientTypeToJSON;

  }
}
