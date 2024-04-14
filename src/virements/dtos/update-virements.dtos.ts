import { PartialType } from "@nestjs/mapped-types";
import { CreateVirementsDto } from "./create-virements.dto";

export class UpdateVirementsDtos extends PartialType(CreateVirementsDto) {}