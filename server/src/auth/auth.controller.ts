import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}
    @Post('login')
    login(){
        this.AuthService.login();
    }

    @Post('singin')
    signIn(){
        return this.AuthService.signIn()
    }
}
