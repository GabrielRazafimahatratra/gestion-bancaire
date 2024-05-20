import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class CreateVirementsDto {

    @IsString()
    @IsNotEmpty()
    numeroCompteDestinataire: string;

    @IsString()
    @IsNotEmpty()
    numeroCompteExpediteur: string;
    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    montantVirement: Decimal;
    
}