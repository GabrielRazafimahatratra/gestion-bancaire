import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

@Module({
    imports: [
        ConfigModule.forRoot()
    ],
    providers: [ JwtService],
})
export class JwtModule {}

