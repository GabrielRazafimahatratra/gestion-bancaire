import { PartialType } from "@nestjs/mapped-types";
import { CreateRetraitsDto } from "./create-retraits.dto";

export class UpdateRetraitsDto extends PartialType(CreateRetraitsDto) {}