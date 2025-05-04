import { Body, Controller, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto/updateUser.dto";
import { PoliciesGuard } from "src/casl/policies/policies.guard";
import { CheckPolicies } from "src/casl/policies/policies.decorator";
import { UpdateUserPolicy } from "./policies/updateUser.policy";

@Controller("users")
@UseGuards(PoliciesGuard)
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

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
}