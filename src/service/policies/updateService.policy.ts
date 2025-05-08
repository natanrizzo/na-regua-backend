import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ServiceModel } from "src/models/service.model";

export class UpdateServicePolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            params: { id: string },
            body: any
        }): boolean {
        const service = new ServiceModel(
            context.params.id,
            context.body.name,
            context.body.price,
            context.body.duration
        );

        return ability.can('update', service);
    }
}