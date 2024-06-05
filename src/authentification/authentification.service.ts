import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import { CaissiersService } from 'src/caissiers/caissiers.service';
import { Caissier } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthentificationService {
    constructor(
        private caissierService : CaissiersService,
        private jwtService: JwtService,
        private prisma : PrismaService
    ){}

  

    async login(emailCaissier: string, password: string): Promise<{access_token : string, cashier: Caissier | null }> {

        const caissier = await this.prisma.caissier.findUnique({
            where: {emailCaissier}
        });

        if (!caissier || !(await bcrypt.compare(password, caissier.password))) {
            return{
                access_token:"No",
                cashier: null
            };
        }

        const payload = { sub: caissier.emailCaissier, role: 'caissier'}


        return {
            access_token : await this.jwtService.signAsync(payload),
            cashier: caissier
        };
    }

    async register(caissier: Omit<Caissier, 'id'>): Promise<{access_token: string, caissier: Caissier}> {
        const hashedPassword = await bcrypt.hash(caissier.password, 10);
       
        const numeroCaissierGenere = await this.caissierService.genererNumeroCaissier();

        const nouveauCaissier = await this.prisma.caissier.create({

            data: {
                ...caissier,
                password: hashedPassword,
                numeroCaissier: numeroCaissierGenere
            }
        });

        const payload = { sub: nouveauCaissier.emailCaissier, role: 'caissier'};
        const access_token = await this.jwtService.signAsync(payload);

        return { access_token,
            caissier: nouveauCaissier
        }
    }

    async getCaissierByEmailCaissier(emailCaissier: string): Promise<Caissier | null> {
        return this.prisma.caissier.findUnique({
            where: {emailCaissier}
        });
    }
    
}
