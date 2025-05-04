import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { ProductModel } from "src/models/product.model";

export class CreateProductPolicy implements PolicyHandler {
    handle(
        ability: AppAbility, 
        context: {
            body: any
        }
    ): boolean {
        const product = new ProductModel(
            context.body.name,
            Number(context.body.salePrice),
            Number(context.body.profit)
        );

        return ability.can('create', product);
    }
}