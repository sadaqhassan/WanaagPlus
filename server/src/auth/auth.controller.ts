import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto } from './Dto/auth.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}
    @Post('login')
    login(){
        return this.AuthService.login();
    }

    @Post('signin')
    signIn(@Body() dto:CreateUserDto){
        return this.AuthService.signIn(dto)
    }
}
