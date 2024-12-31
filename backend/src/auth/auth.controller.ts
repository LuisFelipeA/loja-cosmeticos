import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Public()
    @Post('login')
    async signIn(@Body() signInDto: Record<string, any>) {
        return await this.authService.signIn(signInDto.username,signInDto.password);
    }

}
