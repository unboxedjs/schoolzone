import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { Role } from '@sz/enum';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const allow = this.reflector.get<Role[]>('allow', context.getHandler());
    const deny = this.reflector.get<Role[]>('deny', context.getHandler());

    if (!allow && !deny) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userRole: Role = request?.user?.role;

    if (allow) {
      const allRoles = Object.values(Role);
      const untill = allRoles.findIndex(role => role == allow[0]);
      allow.unshift(...allRoles.slice(0, untill));
    }
    return allow ? allow.includes(userRole) : !deny.includes(userRole);
  }
}
