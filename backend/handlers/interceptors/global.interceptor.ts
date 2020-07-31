import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { info } from 'console';
import { AllowLog } from 'backend/library/logger';

@Injectable()
export class GlobalInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now();
    const request = context.switchToHttp().getRequest();
    const { method, url, user = {} } = request;

    return next.handle().pipe(
      tap(() => {
        if (AllowLog(url)) {
          const delay = Date.now() - now;
          info(`Success | [${method}] ${url} - ${delay}ms`, user);
        }
      }),
    );
  }
}
