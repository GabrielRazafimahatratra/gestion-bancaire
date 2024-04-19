// import { PartialType } from "@nestjs/mapped-types";
// import { CreateCaissierDto } from "src/caissiers/dto/create-caissier.dto";


import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    nomCaissier: string;

    @IsNotEmpty()
    @IsString()
    prenomsCaissier: string;
    
    @IsNotEmpty()
    @IsString()
    numeroCaissier: string;

    @IsNotEmpty()
    @IsString()
    numeroCaisse: string;

    @IsNotEmpty()
    @IsEmail()
    emailCaissier: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;

    @IsNotEmpty()
    @IsString()
    telephoneCaissier: string;

}


