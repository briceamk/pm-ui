
import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/auth/store/reducers';
import * as fromPermission from '@module/auth/store/reducers/permission.reducer';

import { Permission } from '@module/auth/models';

const selectPermissionState = createSelector(
  fromFeature.selectSecurityState,
  (state: fromFeature.SecurityState) => state.permissions
);

export const selectPermissionEntities = createSelector(
  selectPermissionState,
  fromPermission.selectPermissionEntities
);

export const selectSelectedPermission = createSelector(
  selectPermissionEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Permission>, params: Params): Permission => {
    return params && entities[params.permissionId];
  }
);

export const selectPermissionIds = createSelector(
  selectPermissionState,
  fromPermission.selectPermissionIds
);

export const selectAllPermissions = createSelector(
  selectPermissionState,
  fromPermission.selectAllPermissions
);

export const selectPermissionLoaded = createSelector(
  selectPermissionState,
  fromPermission.selectPermissionLoaded
);
export const selectPermissionLoading = createSelector(
  selectPermissionState,
  fromPermission.selectPermissionLoading
);

export const selectPermissionErrorMsg = createSelector(
  selectPermissionState,
  fromPermission.selectPermissionErrorMsg
);
export const selectPermissionTotal = createSelector(
  selectPermissionState,
  fromPermission.selectPermissionTotal
);
