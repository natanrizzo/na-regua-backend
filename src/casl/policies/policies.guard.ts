import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AbilityFactory } from "../ability.factory";
import { PolicyHandler } from "./policy-handler.interface";
import { CHECK_POLICIES_KEY } from "./policies.decorator";

@Injectable()
export class PoliciesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private readonly abilityFactory: AbilityFactory
    ) {}

    canActivate(context: ExecutionContext): boolean {
        const policyHandlers = this.reflector.getAllAndOverride<PolicyHandler[]>(CHECK_POLICIES_KEY, [
            context.getHandler(),
            context.getClass()
        ]);
        if (!policyHandlers) return true;

        const { user, params, body } = context.switchToHttp().getRequest();
        const ability = this.abilityFactory.defineAbilityFor(user);

        for (const handler of policyHandlers) {
            if (!handler.handle(ability, { params, body })) {
                throw new ForbiddenException('You do not have permission to perform this action');
            }
        }
        return true;
    }
}