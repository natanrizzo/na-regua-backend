import { AppAbility } from "src/casl/ability.factory";
import { PolicyHandler } from "src/casl/policies/policy-handler.interface";
import { TransactionModel } from "src/models/transaction.model";

export class ReadFinancialPolicy implements PolicyHandler {
    handle(
        ability: AppAbility
    ): boolean {
        return ability.can('read', TransactionModel);
    }
}