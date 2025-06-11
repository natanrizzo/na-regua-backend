import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const CurrentUser = createParamDecorator(
    (data: unknown, ctx: ExecutionContext) => {
        const user = ctx.switchToHttp().getRequest().user;

        if (!user) return null;

        const { sub, ... rest } = user;
        return {
            id: sub,
            ...rest,
        };
    },
);