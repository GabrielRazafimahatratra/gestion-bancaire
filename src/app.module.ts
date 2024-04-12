import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CaissiersModule } from './caissiers/caissiers.module';
import { PretModule } from './prets/prets.module';
import { BanqueController } from './banque/banque.controller';
import { BanqueService } from './banque/banque.service';
import { BanqueModule } from './banque/banque.module';
import { PrismaService } from 'prisma/prisma.service';
import { RemboursementModule } from './remboursements/remboursements.module';

@Module({
  imports: [ClientsModule, CaissiersModule, PretModule, BanqueModule, RemboursementModule],
  controllers: [AppController, BanqueController],
  providers: [AppService, BanqueService, PrismaService],
})
export class AppModule {}
