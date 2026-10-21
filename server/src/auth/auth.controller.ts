import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { CreateUserDto, loginUserDto } from './Dto/auth.dto.js';

@Controller('auth')
export class AuthController {
    constructor(private AuthService:AuthService){}
    @Post('login')
    login(@Body() dto:loginUserDto){
        return this.AuthService.login(dto);
    }

    @Post('signin')
    signIn(@Body() dto:CreateUserDto){
        return this.AuthService.signIn(dto)
    }
}
