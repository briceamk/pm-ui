
import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/auth/store/reducers';
import * as fromUser from '@module/auth/store/reducers/user.reducer';

import { User } from '@module/auth/models';

const selectUserState = createSelector(
  fromFeature.selectSecurityState,
  (state: fromFeature.SecurityState) => state.users
);

export const selectUserEntities = createSelector(
  selectUserState,
  fromUser.selectUserEntities
);

export const selectSelectedUser = createSelector(
  selectUserEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<User>, params: Params): User => {
    return params && entities[params.userId];
  }
);

export const selectUserIds = createSelector(
  selectUserState,
  fromUser.selectUserIds
);

export const selectAllUsers = createSelector(
  selectUserState,
  fromUser.selectAllUsers
);

export const selectUserLoaded = createSelector(
  selectUserState,
  fromUser.selectUserLoaded
);
export const selectUserLoading = createSelector(
  selectUserState,
  fromUser.selectUserLoading
);

export const selectUserErrorMsg = createSelector(
  selectUserState,
  fromUser.selectUserErrorMsg
);
export const selectUserTotal = createSelector(
  selectUserState,
  fromUser.selectUserTotal
);
