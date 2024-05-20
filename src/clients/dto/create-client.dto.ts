import { IsNumber, IsString, Min } from "class-validator";

export class CreateClientDto {
    @IsString()
    numeroCompte: string; 

    @IsString()
    nomClient: string;

    @IsString()
    prenomsClient: string;

    @IsString()
    addresseClient: string;
    
    @IsString()
    emailClient: string;
    
    @IsString()
    telephoneClient: string;
    
    @IsNumber()
    @Min(0)
    montantClient: number;

}
