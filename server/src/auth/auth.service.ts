import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
    login(){
        return "this is login"
    }

    signIn(){
        return "this is signin"
    }
}
