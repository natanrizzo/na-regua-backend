import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { AddressService } from "./address.service";
import { CreateAddressDTO } from "./dto/createAddress.dto";
import { CurrentUser } from "src/auth/currentUser.decorator";
import { User } from "generated/prisma";
import { UpdateAddressDTO } from "./dto/updateAddress.dto";

@Controller("addresses")
export class AddressController {
    constructor(
        private readonly addressService: AddressService
    ) {}


    @Post("/")
    async createAddress(
        @CurrentUser() user: User,
        @Body() address: CreateAddressDTO
    ) {
        return await this.addressService.createAddress(user.id, address);
    }

    @Post("/add")
    async addAddress(
        @Body() address: CreateAddressDTO
    ) {

        return await this.addressService.addAddress(address);
    }

    @Get("/owned")
    async getOwnedAddresses(
        @CurrentUser() user: User
    ) {
        return await this.addressService.getUserAddressess(user.id);
    }

    @Get("/:id")
    async getAddress(
        @CurrentUser() user: User,
        @Param("id") id: string
    ) {
        return await this.addressService.getAddress(user.id, id);
    }

    @Put("/:id")
    async updateAddress(
        @CurrentUser() user: User,
        @Param("id") id: string,
        @Body() address: UpdateAddressDTO
    ) {
        return await this.addressService.updateAddress(user.id, id, address);
    }

    @Delete("/:id")
    async deleteAddress(
        @CurrentUser() user: User,
        @Param("id") id: string
    ) {
        return await this.addressService.deleteAddress(user.id, id);
    }
}