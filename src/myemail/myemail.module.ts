import { Module } from "@nestjs/common";
import { MyemailService } from "./myemail.service";

@Module({
    providers: [MyemailService]
})
export class myemailModule {}