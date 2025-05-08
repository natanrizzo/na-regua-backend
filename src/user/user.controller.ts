import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { UpdateUserPolicy } from "./policies/updateUser.policy";
import { DeleteUserPolicy } from "./policies/deleteUser.policy";
import { CreateUserDTO } from "./dto/createUser.dto";
import { CreateUserPolicy } from "./policies/createUser.policy";

@Controller("users")
@UseGuards(PoliciesGuard)
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Post("/")
    @CheckPolicies(new CreateUserPolicy())
    async createUser(
        @Body() createUserDTO: CreateUserDTO
    ) {
        return await this.userService.createUser(createUserDTO);
    }


    @Get("/:id")
    async getUserById(
        @Param('id') id: string
    ) {
        return await this.userService.getUserById(id);
    }


    @Patch("/:id")
    @CheckPolicies(new UpdateUserPolicy())
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDTO: UpdateUserDTO,
    ) {
        return await this.userService.updateUser(id, updateUserDTO);
    }

    @Delete('/:id')
    @CheckPolicies(new DeleteUserPolicy())
    async deleteUser(
        @Param('id') id: string
    ) {
        return await this.userService.deleteUser(id);
    }
}