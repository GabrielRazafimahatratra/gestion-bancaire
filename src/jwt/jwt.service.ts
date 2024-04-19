import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModuleOptions, JwtOptionsFactory } from '@nestjs/jwt';

@Injectable()
export class JwtService implements JwtOptionsFactory{
    constructor( private configService: ConfigService) {}

    createJwtOptions(): JwtModuleOptions | Promise<JwtModuleOptions> {
        return {
            secret: this.configService.get<string>('JWT_SECRET'),
            signOptions: {expiresIn: '60m'}
        };
    }
}
