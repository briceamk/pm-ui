import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromDepartment from '@module/organization/store/reducers/department.reducer';

import { Department } from '@module/organization/models';

const selectDepartmentState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.departments
);

export const selectDepartmentEntities = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentEntities
);

export const selectSelectedDepartment = createSelector(
  selectDepartmentEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Department>, params: Params): Department => {
    return params && entities[params.departmentId];
  }
);

export const selectDepartmentIds = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentIds
);

export const selectAllDepartments = createSelector(
  selectDepartmentState,
  fromDepartment.selectAllDepartments
);

export const selectDepartmentLoaded = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentLoaded
);
export const selectDepartmentLoading = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentLoading
);

export const selectDepartmentErrorMsg = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentErrorMsg
);
export const selectDepartmentTotal = createSelector(
  selectDepartmentState,
  fromDepartment.selectDepartmentTotal
);
