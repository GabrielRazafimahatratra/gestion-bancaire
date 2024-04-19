import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCaissierDto } from './dto/create-caissier.dto';
import { UpdateCaissierDto } from './dto/update-caissier.dto';

@Injectable()
export class CaissiersService {
  constructor(private readonly prisma: PrismaService) {}

  async createCashiers(createCashier: CreateCaissierDto) {

    const numeroCaissierGenere = await this.genererNumeroCaissier();

    const cashier = await this.prisma.caissier.create({
        data: {
          ...createCashier,
          numeroCaissier: numeroCaissierGenere
        }
    });

    const cashierTypeToJSON = JSON.stringify(cashier)

    return cashierTypeToJSON;
    
  }

  async genererNumeroCaissier(): Promise<string> {
    const lastCashier = await this.prisma.caissier.findFirst({
        orderBy: {
            numeroCaissier: 'desc',
        },
        select: {
            numeroCaissier: true,
        }
    });

    if (!lastCashier) { return 'Caissier001';}

    const lastNumber = parseInt(lastCashier.numeroCaissier.slice(8),10);
    const newNumber = String(lastNumber + 1).padStart(3, '0');
    return `Caissier${newNumber}`;
  }


  async findAllCashiers() {
    return this.prisma.caissier.findMany();
  }

  findOneCashier(numeroCaissier: string){
    return this.prisma.caissier.findUnique({
      where: {numeroCaissier}
    });
  }

  findOneCashierByEmail(email: string) {
    return this.prisma.caissier.findUnique({
      where: {emailCaissier: email}
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
