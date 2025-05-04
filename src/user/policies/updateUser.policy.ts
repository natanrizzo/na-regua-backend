import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { UserModel } from "src/models/user.model";

export class UpdateUserPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            params: { id: string };
            body: any
        }
    ): boolean {
        const user = new UserModel(
            context.params.id,
            context.body.name,
            context.body.email
        );
        
        return ability.can('update', user);
    }
}