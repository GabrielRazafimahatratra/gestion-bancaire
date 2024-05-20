import { Decimal } from "@prisma/client/runtime/library"
import { IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator"

export class CreatePretDto{
   
    @IsString()
    @IsNotEmpty()
    @IsPositive()
    montantPret:Decimal;

    @IsString()
    @IsNotEmpty()
    tauxPret: Decimal;     

    @IsNumber()
    @IsNotEmpty()
    delaiPret: number;

    
    @IsString()
    @IsNotEmpty()
    numeroCompteEmprunteur: string;


}