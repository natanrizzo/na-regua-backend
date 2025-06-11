import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ProductModel } from "src/models/product.model";

export class CreateProductPolicy implements PolicyHandler {
    handle(
        ability: AppAbility,
    ): boolean {
        return ability.can('create', ProductModel);
    }
}