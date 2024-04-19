import { Module } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';
import { AuthentificationController } from './authentification.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { CaissiersService } from 'src/caissiers/caissiers.service';
import { PrismaService } from 'prisma/prisma.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
    })
    
  ],
  providers: [AuthentificationService, JwtStrategy, CaissiersService, PrismaService, ConfigService],
  controllers: [AuthentificationController],
  exports: [AuthentificationService],
})
export class AuthentificationModule {}
