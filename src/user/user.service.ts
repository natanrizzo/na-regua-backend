import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "generated/prisma";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createUser(user: { name, email, password }): Promise<User> {
        return await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            }
        });
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return await this.prisma.user.findUnique({
            where: { email }
        });
    }

    async updateUser(id: string, { name }: UpdateUserDTO) {
        return await this.prisma.user.update({
            where: { id },
            data: {
                name
            }
        });
    }
}