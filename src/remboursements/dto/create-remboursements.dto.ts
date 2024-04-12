import { Decimal } from "@prisma/client/runtime/library"
import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateRemboursementsDto {
    @IsString()
    idRemboursement: string

    @IsNumber()
    @IsNotEmpty()
    montantAPayer: Decimal
    
    @IsString()
    @IsNotEmpty()
    numeroCompteDeLaBanque: string

    @IsString()
    @IsNotEmpty()
    numeroCompte: string

    @IsString()
    @IsNotEmpty()
    numeroPret: string
}