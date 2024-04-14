import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateVirementsDto {

    @IsString()
    @IsNotEmpty()
    numeroVirement: string;

    @IsString()
    @IsNotEmpty()
    numeroCompteDestinataire: string;

    @IsString()
    @IsNotEmpty()
    numeroCompteExpediteur: string;
    
    @IsNumber()
    @IsNotEmpty()
    montantVirement: Decimal;
    
}