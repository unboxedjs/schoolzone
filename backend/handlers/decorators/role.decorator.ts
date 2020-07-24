import { SetMetadata, CustomDecorator } from '@nestjs/common';
import { Role } from '@sz/enum';

/**
 *
 * @param { Role[] } roles - Start with higher role for granularity (or) lower role for specificity
 */
export const Allow = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata('allow', roles);

/**
 *
 * @param  { Role[] } roles - Add list of roles to deny resource
 */
export const Deny = (...roles: Role[]): CustomDecorator<string> =>
  SetMetadata('deny', roles);

/**
 * Add to make an endpoint Public
 */
export const Public = (): CustomDecorator<string> =>
  SetMetadata('public', true);
