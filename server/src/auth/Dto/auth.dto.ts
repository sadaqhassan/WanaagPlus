import { IsEmail, IsString } from "class-validator"

export class CreateUserDto {
    @IsString()
    name : string

    @IsEmail({},{message:"Email is required"})
    @IsString()
    email :string

    @IsString()
    password :string
}
