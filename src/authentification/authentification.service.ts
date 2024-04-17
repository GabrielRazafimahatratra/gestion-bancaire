import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import * as bcrypt from 'bcrypt';
import {AccessToken} from './types/AccessToken';
import { RegisterRequestDto } from './dtos/register-request.dto';
import { CaissiersService } from 'src/caissiers/caissiers.service';
import { UpdateCaissierDto } from 'src/caissiers/dto/update-caissier.dto';
import { Caissier } from '@prisma/client';

@Injectable()
export class AuthentificationService {
    constructor(
        private caissierService : CaissiersService,
        private jwtService: JwtService,
    ){}

    async validateUser(email: string, password: string): Promise<Caissier> {
        const cashier = await this.caissierService.findOneCashierByEmail(email);
        if(!cashier) {
            throw new BadRequestException('Caissier non trouvé');
        }
        const estTrouve: boolean = bcrypt.compareSync(password, cashier.password);
        if (!estTrouve) {
            throw new BadRequestException('Mot de passe non existant');
        }
        return cashier;
    }

    async login(cashier: UpdateCaissierDto): Promise<AccessToken> {

        const payload = {email: cashier.emailCaissier, id:cashier.numeroCaissier};
        return {access_token : this.jwtService.sign(payload)};
    }

    // async register(cashier: RegisterRequestDto): Promise<string> {
    //     const caissierExistant = this.caissierService.findOneCashierByEmail(cashier.email);
    //     if (caissierExistant) {
    //         throw new BadRequestException('Email déjà existant');
    //     }
    //     // const hashedPassword = await bcrypt.hash(cashier.password, 10);
       
    //     // const nouveauCaissier:   { ...cashier, password: hashedPassword};
    //     //const caissierInscrit = await this.caissierService.createCashiers(nouveauCaissier);

    //     return caissierInscrit;
    // }

    
}
