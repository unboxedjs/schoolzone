import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { GeneralService } from '../../_services/general.service';
import {
  LoadConfig,
  SuccessLoadConfig,
  LoginUser,
  SuccessLogin,
} from './config.action';
import { map, mergeMap, exhaustMap } from 'rxjs/operators';
import { AppStatus, AuthResponse } from '@sz/interface';
import { AuthService } from 'frontend/shared/src/lib/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class ConfigEffects {
  loadConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoadConfig),
      mergeMap(() =>
        this.general.appStatus$.pipe(
          map((status: AppStatus) =>
            SuccessLoadConfig({ payload: { status } }),
          ),
        ),
      ),
    ),
  );

  authConfig$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginUser),
      exhaustMap(user =>
        this.auth.login(user).pipe(
          map((response: AuthResponse) => {
            this.router.navigate(['']);
            localStorage.setItem('token', response.token);
            return SuccessLogin({ payload: response });
          }),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private general: GeneralService,
    private auth: AuthService,
    private router: Router,
  ) {}
}
