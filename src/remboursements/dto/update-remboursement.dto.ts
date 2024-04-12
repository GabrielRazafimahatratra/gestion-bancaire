import { PartialType } from "@nestjs/mapped-types";
import { CreateRemboursementsDto } from "./create-remboursements.dto";

export class UpdateRemboursementsDto extends PartialType(CreateRemboursementsDto) {}