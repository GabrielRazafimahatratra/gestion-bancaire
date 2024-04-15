import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateBanqueDto {

    @IsString()
    @IsNotEmpty()
    numeroCompteBanque: string;
    
    @IsNumber()
    soldeBanque: Decimal;
    
    @IsNumber()
    soldePayeParRemboursements: Decimal;

}