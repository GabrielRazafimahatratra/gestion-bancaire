import { Module } from "@nestjs/common";
import { BanqueService } from "./banque.service";
import { BanqueController } from "./banque.controller";

@Module({
    providers: [BanqueService],
    controllers: [BanqueController]
})
export class BanqueModule {}