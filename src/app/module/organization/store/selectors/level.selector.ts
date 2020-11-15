import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromLevel from '@module/organization/store/reducers/level.reducer';

import { Level } from '@module/organization/models';

const selectLevelState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.levels
);

export const selectLevelEntities = createSelector(
  selectLevelState,
  fromLevel.selectLevelEntities
);

export const selectSelectedLevel = createSelector(
  selectLevelEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Level>, params: Params): Level => {
    return params && entities[params.levelId];
  }
);

export const selectLevelIds = createSelector(
  selectLevelState,
  fromLevel.selectLevelIds
);

export const selectAllLevels = createSelector(
  selectLevelState,
  fromLevel.selectAllLevels
);

export const selectLevelLoaded = createSelector(
  selectLevelState,
  fromLevel.selectLevelLoaded
);
export const selectLevelLoading = createSelector(
  selectLevelState,
  fromLevel.selectLevelLoading
);

export const selectLevelErrorMsg = createSelector(
  selectLevelState,
  fromLevel.selectLevelErrorMsg
);
export const selectLevelTotal = createSelector(
  selectLevelState,
  fromLevel.selectLevelTotal
);
