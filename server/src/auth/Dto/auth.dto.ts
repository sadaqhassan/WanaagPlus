import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    name : string

    @IsEmail({},{message:"Email is required"})
    @IsString()
    @IsNotEmpty()
    email :string

    @IsString()
    @IsNotEmpty()
    password :string
}



export class loginUserDto {

    @IsEmail({},{message:"Email is required"})
    @IsString()
    @IsNotEmpty()
    email :string

    @IsString()
    @IsNotEmpty()
    password :string
}
