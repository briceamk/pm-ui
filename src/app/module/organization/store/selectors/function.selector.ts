import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromFunction from '@module/organization/store/reducers/function.reducer';

import { Function } from '@module/organization/models';

const selectFunctionState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.functions
);

export const selectFunctionEntities = createSelector(
  selectFunctionState,
  fromFunction.selectFunctionEntities
);

export const selectSelectedFunction = createSelector(
  selectFunctionEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Function>, params: Params): Function => {
    return params && entities[params.functionId];
  }
);

export const selectFunctionIds = createSelector(
  selectFunctionState,
  fromFunction.selectFunctionIds
);

export const selectAllFunctions = createSelector(
  selectFunctionState,
  fromFunction.selectAllFunctions
);

export const selectFunctionLoaded = createSelector(
  selectFunctionState,
  fromFunction.selectFunctionLoaded
);
export const selectFunctionLoading = createSelector(
  selectFunctionState,
  fromFunction.selectFunctionLoading
);

export const selectFunctionErrorMsg = createSelector(
  selectFunctionState,
  fromFunction.selectFunctionErrorMsg
);
export const selectFunctionTotal = createSelector(
  selectFunctionState,
  fromFunction.selectFunctionTotal
);
