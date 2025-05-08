import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { UserModel } from "src/models/user.model";

export class DeleteUserPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            params: { id: string }
        }): boolean {
        const user = new UserModel(
            context.params.id,
            '',
            ''
        );

        return ability.can('delete', user);
    }
}