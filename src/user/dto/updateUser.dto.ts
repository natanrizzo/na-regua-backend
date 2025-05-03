import { IsEmail, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UpdateUserDTO {
    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsStrongPassword()
    password?: string;
}