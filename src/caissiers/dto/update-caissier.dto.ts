import { IsString } from "class-validator"

export class UpdateCaissierDto {
    
    @IsString()
    numeroCaissier: string
    @IsString()  
    nomCaissier: string
    @IsString()
    prenomsCaissier: string
    @IsString()
    emailCaissier: string
    @IsString()
    password: string
    @IsString()
    telephoneCaissier: string
}