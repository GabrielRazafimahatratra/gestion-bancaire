import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateVersementsDto {
    @IsString()
    numeroVersement: string;

    @IsString()
    @IsNotEmpty()
    numeroCompteVersement:string;
    
    @IsNumber()
    @IsNotEmpty()
    montantVersement: Decimal;
    
    @IsString()
    @IsNotEmpty()
    nomVerseur: string

    @IsString()
    prenomsVerseur: string
}