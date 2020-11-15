import { createFeatureSelector, combineReducers, Action } from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromJobInfo from '@module/cron/store/reducers/job-info.reducer';

export interface CronState {
  jobInfos: fromJobInfo.JobInfoState;
}
export interface State extends fromRoot.State {
  cron: CronState;
}

export function reducers(state: CronState | undefined, action: Action) {
  return combineReducers({
    jobInfos: fromJobInfo.reducer
  })(state, action);
}

export const selectCronState = createFeatureSelector<CronState>(
  'cron'
);
