import { Decimal } from "@prisma/client/runtime/library"
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator"

export class CreateRemboursementsDto {
    
    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    montantAPayer: Decimal
    
    @IsString()
    @IsNotEmpty()
    numeroCompteDeLaBanque: string

    @IsString()
    @IsNotEmpty()
    numeroCompteVerseur: string

    @IsString()
    @IsNotEmpty()
    numeroPretPourLeRemboursement: string
}