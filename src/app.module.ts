import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from './clients/clients.module';
import { CaissiersModule } from './caissiers/caissiers.module';

@Module({
  imports: [ClientsModule, CaissiersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
