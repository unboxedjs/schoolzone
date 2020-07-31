import { applyDecorators } from '@nestjs/common';
import { ApiOptions } from '@sz/interface';
import { Public, Allow, Deny } from './role.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Role } from '@sz/enum';
import { constructOperation } from 'backend/utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const Api = (
  ...[name, endpoint, access = { isPublic: true }]: ApiOptions
) => {
  const decorators = [];

  const { isPublic, allow, deny } = access;

  if (isPublic) {
    decorators.push(Public());
  } else {
    decorators.push(
      ApiBearerAuth(),
      allow ? Allow(...(allow as Role[])) : Deny(...(deny as Role[])),
    );
  }

  if (endpoint) {
    decorators.push(ApiOperation(constructOperation(endpoint, name)));
  }

  return applyDecorators(...decorators);
};
