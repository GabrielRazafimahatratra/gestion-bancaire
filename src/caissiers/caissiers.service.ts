import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCaissierDto } from './dto/create-caissier.dto';
import { UpdateCaissierDto } from './dto/update-caissier.dto';

@Injectable()
export class CaissiersService {
    constructor(private readonly prisma: PrismaService) {}

  async createCashiers(createCashier: CreateCaissierDto) {
    const cashier = await this.prisma.caissier.create({
        data: createCashier
    })

    const cashierTypeToJSON = JSON.stringify(cashier)

    return cashierTypeToJSON;
    
  }

  async findAllCashiers() {
    return this.prisma.caissier.findMany();
  }

  findOneCashier(numeroCaissier: string){
    return this.prisma.caissier.findUnique({
      where: {numeroCaissier}
    });
  }

  async updateCashier(numeroCaissier: string, updateCashierDto: UpdateCaissierDto): Promise<string> {
    
    const updateCashier = await this.prisma.caissier.update({
      where: {numeroCaissier},
      data: updateCashierDto
    });

    const updateCashierTypeToJSON = JSON.stringify(updateCashier);

    return updateCashierTypeToJSON;
  }

  async removeCashier(numeroCaissier: string): Promise<string> {
    const deletedCashier = await this.prisma.caissier.delete({
      where: {numeroCaissier}
    });

    const deletedCashierTypeToJSON = JSON.stringify(deletedCashier)

    return deletedCashierTypeToJSON;

  }
}
