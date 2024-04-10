import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CaissiersModule } from './caissiers/caissiers.module';
import { PretModule } from './prets/prets.module';

@Module({
  imports: [ClientsModule, CaissiersModule, PretModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
