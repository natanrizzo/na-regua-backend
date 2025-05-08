import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "generated/prisma";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Injectable()
export class UserService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createUser(user: { name, email, password }): Promise<Omit<User, 'password'>> {
        return await this.prisma.user.create({
            data: {
                name: user.name,
                email: user.email,
                password: user.password
            },
            omit: {
                password: true
            }
        });
    }

    async getUserByEmail(email: string): Promise<User | undefined> {
        return await this.prisma.user.findUnique({
            where: { email }
        });
    }

    async getUserById(id: string) {
        return await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                name: true,
                role: true,
            }
        });
    }

    async updateUser(id: string, { name }: UpdateUserDTO): Promise<Omit<User, 'password'>> {
        return await this.prisma.user.update({
            where: { id },
            data: {
                name
            },
            omit: {
                password: true
            }
        });
    }

    async deleteUser(id: string): Promise<Omit<User, 'password'>> {
        return await this.prisma.user.delete({
            where: { id },
            omit: {
                password: true
            }
        });
    }
}