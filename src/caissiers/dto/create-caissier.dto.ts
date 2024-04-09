import { IsString } from "class-validator"

export class CreateCaissierDto {
    @IsString()
    numeroCaissier: string
    @IsString()  
    nomCaissier: string
    @IsString()
    prenomsCaissier: string
    @IsString()
    numeroCaisse: string
    @IsString()
    emailCaissier: string
    @IsString()
    password: string
    @IsString()
    telephoneCaissier: string
}