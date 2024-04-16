import { IsEnum, IsJSON, IsNotEmpty, IsString } from "class-validator"
import { EventType } from 'src/historiques/event-type'
export class CreateHistoriquesDto {

    @IsEnum(EventType)
    @IsNotEmpty()
    type: EventType;
    
    @IsString()
    @IsNotEmpty()
    identifiantOfType: string;
    
    @IsJSON()
    @IsNotEmpty()
    donnee: JSON;

}