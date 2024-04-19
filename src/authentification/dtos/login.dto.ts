import { IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    emailCaissier: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

}