import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateUserDto, loginUserDto } from './Dto/auth.dto.js';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
    constructor(private prisma : PrismaService){}
    async login(dto:loginUserDto){
        try {
            const user = await this.prisma.user.findUnique({where:{email:dto.email}})
            if(!user){
                throw new UnauthorizedException("Invalid email or password")
            }

            const isMatch = bcrypt.compareSync(dto.password,user.password)
            if(!isMatch) throw new UnauthorizedException("Invalid email or password")

            return user;

        } catch (error) {
            throw  error
        }
    }

    async signIn(dto:CreateUserDto){
        try {
            const user = await this.prisma.user.findUnique({where:{email:dto.email}})
            if(user){
                throw new UnauthorizedException("Invalid email or password")
            }
            const hash = bcrypt.hashSync(dto.password,10);
            
            const newUser = this.prisma.user.create({data:{
                name:dto.name,
                email:dto.email,
                password:hash
            },select:{
                id:true,
                name:true,
                email:true
            }});
            return newUser;

        } catch (error) {
            throw error
        }
    }
}

