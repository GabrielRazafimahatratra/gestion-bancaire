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
import { RetraitsModule } from './retraits/retraits.module';
import { VersementsController } from './versements/versements.controller';
import { VersementsService } from './versements/versements.service';
import { VersementsModule } from './versements/versements.module';
import { VirementsController } from './virements/virements.controller';
import { VirementsService } from './virements/virements.service';
import { VirementsModule } from './virements/virements.module';
import { HistoriquesModule } from './historiques/historiques.module';
import { AuthentificationModule } from './authentification/authentification.module';
import { HistoriquesService } from './historiques/historiques.service';
import { ConfigModule } from '@nestjs/config';
import { MyemailService } from './myemail/myemail.service';
import { MailerService } from './mailer/mailer.service';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env'}),
    
    ClientsModule, CaissiersModule, PretModule, BanqueModule, RemboursementModule, RetraitsModule, VersementsModule, VirementsModule, HistoriquesModule, AuthentificationModule],
  controllers: [AppController, BanqueController, VersementsController, VirementsController],
  providers: [AppService, BanqueService, PrismaService, VersementsService, VirementsService, HistoriquesService, MyemailService, MailerService],
})
export class AppModule {}
