import { AppAbility } from "../ability.factory";

export interface PolicyHandler {
    /**
    * @param ability  The CASL ability built for the current user
    * @param context  (optional) extra info, such as route params or request body
    * @returns whether the action is permitted
    */
    handle(ability: AppAbility, context?: any): boolean;
}