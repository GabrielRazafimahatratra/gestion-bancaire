import { PartialType } from "@nestjs/mapped-types";
import { CreateVersementsDto } from "./create-versements.dto";

export class UpdateVersementsDto extends PartialType(CreateVersementsDto) {}