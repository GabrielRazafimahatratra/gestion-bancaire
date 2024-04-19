import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthentificationService } from './authentification.service';

import { LoginDto } from './dtos/login.dto';
import { RegisterDto } from './dtos/register.dto';
import { JwtGuard } from './guards/jwt.guard';



@Controller('authentification')
export class AuthentificationController {
    constructor(private authService: AuthentificationService) {}

    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto.emailCaissier, loginDto.password);
    }

    @Post('register')
    async register(@Body() registerDto: RegisterDto) {
        return await this.authService.register(registerDto)
    }

    @UseGuards(JwtGuard)
    @Post('profile')
    async getProfile(@Request() req) {
        return req.user;
    }
}
