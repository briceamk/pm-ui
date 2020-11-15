
import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/auth/store/reducers';
import * as fromRole from '@module/auth/store/reducers/role.reducer';

import { Role } from '@module/auth/models';

const selectRoleState = createSelector(
  fromFeature.selectSecurityState,
  (state: fromFeature.SecurityState) => state.roles
);

export const selectRoleEntities = createSelector(
  selectRoleState,
  fromRole.selectRoleEntities
);

export const selectSelectedRole = createSelector(
  selectRoleEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Role>, params: Params): Role => {
    return params && entities[params.roleId];
  }
);

export const selectRoleIds = createSelector(
  selectRoleState,
  fromRole.selectRoleIds
);

export const selectAllRoles = createSelector(
  selectRoleState,
  fromRole.selectAllRoles
);

export const selectRoleLoaded = createSelector(
  selectRoleState,
  fromRole.selectRoleLoaded
);
export const selectRoleLoading = createSelector(
  selectRoleState,
  fromRole.selectRoleLoading
);

export const selectRoleErrorMsg = createSelector(
  selectRoleState,
  fromRole.selectRoleErrorMsg
);
export const selectRoleTotal = createSelector(
  selectRoleState,
  fromRole.selectRoleTotal
);
