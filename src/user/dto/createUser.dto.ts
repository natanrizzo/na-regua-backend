import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword } from "class-validator";
import { Role } from "src/auth/roles/role.enum";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}