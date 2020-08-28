import { AppStatus } from '@sz/interface';
import { createReducer, on } from '@ngrx/store';
import {
  LoadConfig,
  SuccessLoadConfig,
  SuccessLogin,
  LoginUser,
  LogoutUser,
} from './config.action';

export const ConfigFeatureKey = 'config';

export interface ConfigState {
  status: AppStatus;
  token: string;
}

export const initConfig: ConfigState = { status: null, token: null };

export const configReducer = createReducer(
  initConfig,
  on(LoadConfig, LoginUser, state => state),
  on(LogoutUser, ({ token, ...rest }) => rest),
  on(SuccessLoadConfig, SuccessLogin, (state: ConfigState, { payload }) => ({
    ...state,
    ...payload,
  })),
);
