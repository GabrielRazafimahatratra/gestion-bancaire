import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBanqueDto {

    @IsString()
    bankIdentifierCode: string;

    @IsString()
    @IsNotEmpty()
    numeroCompteBanque: string;
    
    @IsNumber()
    solde: Decimal;

}