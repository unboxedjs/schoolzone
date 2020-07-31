import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const { userName, role, _id } = request?.user?.toJSON() || {};
    return userName ? { userName, role, id: _id?.toString() } : {};
  },
);
