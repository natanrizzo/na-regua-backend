import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ServiceModel } from "src/models/service.model";

export class DeleteServicePolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            params: { id: string }
        }): boolean {
        const service = new ServiceModel(
            context.params.id,
            '',
            0,
            0
        );

        return ability.can('delete', service);
    }
}