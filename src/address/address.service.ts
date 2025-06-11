import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateAddressDTO } from "./dto/createAddress.dto";
import { UpdateAddressDTO } from "./dto/updateAddress.dto";

@Injectable()
export class AddressService {
    constructor(
        private readonly prisma: PrismaService
    ) {}

    async createAddress(
        userId: string, {
            city,
            country,
            postalCode,
            state,
            street,
            complement,
            number
    }: CreateAddressDTO) {
        const address = await this.prisma.address.create({
            data: {
                userId,
                city,
                country,
                postalCode,
                state,
                street,
                number,
                complement
            }
        });

        return address;
    }

    async updateAddress(
        userId: string,
        addressId: string,
        address: UpdateAddressDTO
    ) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        const userHasAddress = await this.prisma.address.findUnique({
            where: {
                id: addressId,
                userId: userId
            }
        })
        
        if (!userHasAddress && user.role !== "Administrator") {
            throw new UnauthorizedException("You cannot edit another user's address");
        }

        return await this.prisma.address.update({
            where: { id: addressId },
            data: address
        });
    }

    async getAddress(userId: string, addressId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        
        const address = await this.prisma.address.findUnique({ where: { id: addressId } });

        if (address.userId !== userId && user.role !== "Administrator") {
            throw new UnauthorizedException("You cannot access another user's address");
        }
        
        return address;
    }

    async getUserAddressess(userId: string) {
        return await this.prisma.address.findMany({ where: { userId } });
    }

    async deleteAddress(userId: string, addressId: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });

        const address = await this.prisma.address.findUnique({ where: { id: addressId } });

        if (address.userId !== userId && user.role !== "Administrator") {
            throw new UnauthorizedException("You cannot delete another user's address");
        }

        return await this.prisma.address.delete({ where: {id: addressId}});
    }
}