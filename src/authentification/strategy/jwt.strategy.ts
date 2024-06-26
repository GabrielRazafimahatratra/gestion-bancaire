import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";

import {ConfigService} from '@nestjs/config';
import {ExtractJwt, Strategy} from 'passport-jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService : ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration : false,
            secretOrKey: configService.get('JWT_SECRET'),
        });
    }

    async validate(payload: any) {
        console.log(payload.sub)
        console.log(payload.role)

        return {
            emailCaissier: payload.sub,
            role: payload.role
        };
    }
}