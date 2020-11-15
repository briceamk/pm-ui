import { createSelector } from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/cron/store/reducers';
import * as fromJobInfo from '@module/cron/store/reducers/job-info.reducer';

import { JobInfo } from '@module/cron/models';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

const selectJobInfoState = createSelector(
  fromFeature.selectCronState,
  (state: fromFeature.CronState) => state.jobInfos
);

export const selectJobInfoEntities = createSelector(
  selectJobInfoState,
  fromJobInfo.selectJobInfoEntities
);

export const selectSelectedJobInfo = createSelector(
  selectJobInfoEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<JobInfo>, params: Params): JobInfo => {
    return params && entities[params.jobInfoId];
  }
);

export const selectJobInfoIds = createSelector(
  selectJobInfoState,
  fromJobInfo.selectJobInfoIds
);

export const selectAllJobInfos = createSelector(
  selectJobInfoState,
  fromJobInfo.selectAllJobInfos
);

export const selectJobInfoLoaded = createSelector(
  selectJobInfoState,
  fromJobInfo.selectJobInfoLoaded
);
export const selectJobInfoLoading = createSelector(
  selectJobInfoState,
  fromJobInfo.selectJobInfoLoading
);

export const selectJobInfoErrorMsg = createSelector(
  selectJobInfoState,
  fromJobInfo.selectJobInfoErrorMsg
);
export const selectJobInfoTotal = createSelector(
  selectJobInfoState,
  fromJobInfo.selectJobInfoTotal
);
