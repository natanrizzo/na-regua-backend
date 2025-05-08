import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ServiceModel } from "src/models/service.model";

export class CreateServicePolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            body: any
        }): boolean {
        const service = new ServiceModel(
            '',
            context.body.name,
            context.body.price,
            context.body.duration
        );

        return ability.can('create', service);
    }
}