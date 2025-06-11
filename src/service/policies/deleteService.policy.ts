import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ServiceModel } from "src/models/service.model";

export class DeleteServicePolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
    ): boolean {
        return ability.can('delete', ServiceModel);
    }
}