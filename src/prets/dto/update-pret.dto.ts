import { PartialType } from "@nestjs/mapped-types";
import { CreatePretDto } from "./create-pret.dto";

export class UpdatePretDto extends PartialType(CreatePretDto){}