import {
  ActionReducerMap,
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromAuth from './auth.reducer';

export interface SecurityState {
  auth: fromAuth.AuthState;
}

export interface State extends fromRoot.State {
  security: SecurityState;
}

export function reducers(state: SecurityState | undefined, action: Action) {
  return combineReducers({
    auth: fromAuth.authReducer
  })(state, action);
}

export const selectSecurityState = createFeatureSelector<SecurityState>(
  'security'
);
