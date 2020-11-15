import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromCharge from '@module/organization/store/reducers/charge.reducer';

import { Charge } from '@module/organization/models';

const selectChargeState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.charges
);

export const selectChargeEntities = createSelector(
  selectChargeState,
  fromCharge.selectChargeEntities
);

export const selectSelectedCharge = createSelector(
  selectChargeEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Charge>, params: Params): Charge => {
    return params && entities[params.chargeId];
  }
);

export const selectChargeIds = createSelector(
  selectChargeState,
  fromCharge.selectChargeIds
);

export const selectAllCharges = createSelector(
  selectChargeState,
  fromCharge.selectAllCharges
);

export const selectChargeLoaded = createSelector(
  selectChargeState,
  fromCharge.selectChargeLoaded
);
export const selectChargeLoading = createSelector(
  selectChargeState,
  fromCharge.selectChargeLoading
);

export const selectChargeErrorMsg = createSelector(
  selectChargeState,
  fromCharge.selectChargeErrorMsg
);
export const selectChargeTotal = createSelector(
  selectChargeState,
  fromCharge.selectChargeTotal
);
