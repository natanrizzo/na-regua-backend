import { IsEmail, IsEnum, IsNotEmpty, IsStrongPassword } from "class-validator";
import { Role } from "src/auth/roles/role.enum";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsEmail()
    email: string;

    @IsStrongPassword()
    password: string;

    @IsEnum(Role)
    role?: Role;
}