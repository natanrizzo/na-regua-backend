import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateServiceDTO } from "./dto/createService.dto";
import { Service } from "generated/prisma";
import { UpdateServiceDTO } from "./dto/updateService.dto";

@Injectable()
export class ServiceService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createService({
        name,
        price,
        duration,
    }: CreateServiceDTO): Promise<Service> {
        return await this.prisma.service.create({
            data: {
                name,
                price,
                duration
            }
        });
    }

    async getService(
        id: string
    ): Promise<Service | undefined> {
        return await this.prisma.service.findUnique({
            where: { id },
            include: { appointments: true}
        });
    }

    async getServices(): Promise<Service[]> {
        return await this.prisma.service.findMany({
            include: { appointments: true }
        });
    }

    async updateService(
        id: string, 
        {
            name,
            duration,
            price
        }: UpdateServiceDTO): Promise<Service> {
        return await this.prisma.service.update({
            where: { id },
            data: {
                name,
                duration,
                price,
            },
        });
    }

    async deleteService(
        id: string
    ): Promise<Service> {
        return await this.prisma.service.delete({
            where: { id }
        });
    }
}