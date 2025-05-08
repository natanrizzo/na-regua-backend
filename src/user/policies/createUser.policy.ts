import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { UserModel } from "src/models/user.model";

export class CreateUserPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            body: any
        }): boolean {
        const user = new UserModel(
            '',
            context.body.name,
            context.body.email,
            context.body.role
        );

        return ability.can('create', user);
    }
}