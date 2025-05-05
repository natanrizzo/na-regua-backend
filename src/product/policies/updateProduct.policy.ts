import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ProductModel } from "src/models/product.model";

export class UpdateProductPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            params: { id: string },
            body: any
        }
    ): boolean {
        const product = new ProductModel(
            context.body.name,
            context.body.salePrice,
            context.body.profit,
            context.params.id,
        );

        return ability.can('update', product);
    }
}