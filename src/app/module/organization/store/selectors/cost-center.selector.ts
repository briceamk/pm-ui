import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromCostCenter from '@module/organization/store/reducers/cost-center.reducer';

import { CostCenter } from '@module/organization/models';

const selectCostCenterState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.costCenters
);

export const selectCostCenterEntities = createSelector(
  selectCostCenterState,
  fromCostCenter.selectCostCenterEntities
);

export const selectSelectedCostCenter = createSelector(
  selectCostCenterEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<CostCenter>, params: Params): CostCenter => {
    return params && entities[params.costCenterId];
  }
);

export const selectCostCenterIds = createSelector(
  selectCostCenterState,
  fromCostCenter.selectCostCenterIds
);

export const selectAllCostCenters = createSelector(
  selectCostCenterState,
  fromCostCenter.selectAllCostCenters
);

export const selectCostCenterLoaded = createSelector(
  selectCostCenterState,
  fromCostCenter.selectCostCenterLoaded
);
export const selectCostCenterLoading = createSelector(
  selectCostCenterState,
  fromCostCenter.selectCostCenterLoading
);

export const selectCostCenterErrorMsg = createSelector(
  selectCostCenterState,
  fromCostCenter.selectCostCenterErrorMsg
);
export const selectCostCenterTotal = createSelector(
  selectCostCenterState,
  fromCostCenter.selectCostCenterTotal
);
