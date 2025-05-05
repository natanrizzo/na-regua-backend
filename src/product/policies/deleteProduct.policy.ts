import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ProductModel } from "src/models/product.model";

export class DeleteProductPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            params: { id: string },
        }
    ): boolean {
        const product = new ProductModel(
            '',
            0,
            0,
            context.params.id
        );

        return ability.can('delete', product);
    }
}