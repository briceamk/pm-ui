import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromStep from '@module/organization/store/reducers/step.reducer';

import { Step } from '@module/organization/models';

const selectStepState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.steps
);

export const selectStepEntities = createSelector(
  selectStepState,
  fromStep.selectStepEntities
);

export const selectSelectedStep = createSelector(
  selectStepEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Step>, params: Params): Step => {
    return params && entities[params.stepId];
  }
);

export const selectStepIds = createSelector(
  selectStepState,
  fromStep.selectStepIds
);

export const selectAllSteps = createSelector(
  selectStepState,
  fromStep.selectAllSteps
);

export const selectStepLoaded = createSelector(
  selectStepState,
  fromStep.selectStepLoaded
);
export const selectStepLoading = createSelector(
  selectStepState,
  fromStep.selectStepLoading
);

export const selectStepErrorMsg = createSelector(
  selectStepState,
  fromStep.selectStepErrorMsg
);
export const selectStepTotal = createSelector(
  selectStepState,
  fromStep.selectStepTotal
);
