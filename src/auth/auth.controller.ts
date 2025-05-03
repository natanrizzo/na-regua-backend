import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './public.decorator';
import { CreateUserDTO } from 'src/user/dto/createUser.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}

    @Public()
    @Post('register')
    async register(@Body() dto: CreateUserDTO) {
        return await this.authService.register(dto.name, dto.email, dto.password);
    }

    @Public()
    @Post('login')
    async login(@Body() dto: LoginDTO) {
        return await this.authService.login(dto.email, dto.password);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
