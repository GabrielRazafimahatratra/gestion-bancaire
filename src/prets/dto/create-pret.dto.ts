import { Decimal } from "@prisma/client/runtime/library"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreatePretDto{
    @IsString()
    @IsNotEmpty()
    numeroPret: string; 

    @IsString()
    @IsNotEmpty()
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