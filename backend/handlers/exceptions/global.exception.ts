import {
  Catch,
  ArgumentsHost,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { KeyValue } from '@sz/interface';
import { fatal, warn, AllowLog } from 'backend/library/logger';

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
    const { user = {}, url } = host.switchToHttp().getRequest();

    if (AllowLog(url)) {
      const statusCode =
        error?.status || (error?.response as KeyValue)?.statusCode;
      statusCode === HttpStatus.INTERNAL_SERVER_ERROR
        ? fatal(`${appException}`)
        : warn({ error: error, user });
    }
    super.catch(appException, host);
  }
}
