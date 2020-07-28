import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { KeyValue } from '@sz/interface';
import { fatal, warn } from 'backend/library/logger';

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
    const request = host.switchToHttp().getRequest();
    const statusCode = error?.status || error?.response['statusCode'];
    statusCode === HttpStatus.INTERNAL_SERVER_ERROR
      ? fatal(`${appException}`)
      : warn({ error: error, user: request.user });
    super.catch(appException, host);
  }
}
