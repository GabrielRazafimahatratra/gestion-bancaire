import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateVersementsDto {
  

    @IsString()
    @IsNotEmpty()
    numeroCompteVersement:string;
    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    montantVersement: Decimal;
    
    @IsString()
    @IsNotEmpty()
    nomVerseur: string

    @IsString()
    prenomsVerseur: string
}