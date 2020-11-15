import {
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromAuth from '@module/auth/store/reducers/auth.reducer';
import * as fromRole from '@module/auth/store/reducers/role.reducer';
import * as fromUser from '@module/auth/store/reducers/user.reducer';

export interface SecurityState {
  auth: fromAuth.AuthState;
  roles: fromRole.RoleState;
  users: fromUser.UserState;
}

export interface State extends fromRoot.State {
  security: SecurityState;
}

export function reducers(state: SecurityState | undefined, action: Action) {
  return combineReducers({
    auth: fromAuth.authReducer,
    roles: fromRole.roleReducer,
    users: fromUser.userReducer
  })(state, action);
}

export const selectSecurityState = createFeatureSelector<SecurityState>(
  'security'
);
