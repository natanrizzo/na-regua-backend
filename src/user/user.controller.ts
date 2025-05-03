import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDTO } from "./dto/updateUser.dto";

Controller("users")
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    
    @Patch(":id")
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDTO: UpdateUserDTO,
    ) {
        return await this.userService.updateUser(id, updateUserDTO);
    }
}