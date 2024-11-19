import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from '../dto/user/signin-dto.dto';
import { AuthGuard } from './auth.guard';
import { CreateUserDto } from 'src/dto/user/create-user-dto.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto.userName, signInDto.password);
    }

    @UseGuards(AuthGuard)
    @Get('profile')
    getProfile(@Request() req)
    {
        return req.user;
    }

    @HttpCode(HttpStatus.OK)
    @Post('signUp')
    signUp(@Body() signUpDto: CreateUserDto)
    {
        return this.authService.signUp(signUpDto);
    }
}
