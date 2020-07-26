import { Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { KeyValue } from '@sz/interface';

@Catch()
export class GlobalException extends BaseExceptionFilter {
  catch(exception: KeyValue, host: ArgumentsHost): void {
    const error = { ...exception, ...(exception.response as KeyValue) };
    const appException =
      error.name == 'MongoError'
        ? new BadRequestException({
            message: exception.message || error.name,
            code: error.code,
          })
        : exception;
    super.catch(appException, host);
  }
}
