import { Role } from "src/auth/roles/role.enum";

export class UserModel {
    constructor(
        public id: string,
        public name: string,
        public email: string,
        public role: Role = Role.Client
    ) {}
}