import { Decimal } from "@prisma/client/runtime/library";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreateRetraitsDto {
    
    @IsString()
    @IsNotEmpty()
    numeroCompte: string;
    
    @IsString()
    @IsNotEmpty()
    @IsPositive()
    montantRetrait: Decimal;
    
}