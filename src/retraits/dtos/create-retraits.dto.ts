import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateRetraitsDto {
    
    @IsString()
    @IsNotEmpty()
    numeroCompte: string;
    
    @IsString()
    @IsNotEmpty()
    montantRetrait: Decimal;
    
}