import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '../actions';
import { JobInfo } from '../../models';

export interface JobInfoState extends EntityState<JobInfo> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<JobInfo> = createEntityAdapter<JobInfo>({
  selectId: model => model.id,
  sortComparer: (jobInfo1: JobInfo, jobInfo2: JobInfo): number =>
    jobInfo1.jobName.localeCompare(jobInfo2.jobName)
});

export const initialState: JobInfoState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const jobInfoReducer = createReducer(
  initialState,
  on(fromActions.LoadJobInfos, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromActions.LoadJobInfosSuccess, (state, { jobInfos }) =>
    adapter.addMany(jobInfos, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromActions.CreateJobInfoSuccess, (state, { jobInfo }) =>
    adapter.addOne(jobInfo, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(fromActions.UpdateJobInfoSuccess, (state, { jobInfo }) =>
    adapter.updateOne(jobInfo, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),

  on(
    fromActions.RemoveJobInfoSuccess,
    fromActions.RemoveJobInfosSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    });
  }),

  on(
    fromActions.LoadJobInfosFail,
    fromActions.CreateJobInfoFail,
    fromActions.UpdateJobInfoFail,
    fromActions.RemoveJobInfoFail,
    fromActions.RemoveJobInfosFail,
    (state, { errorMsg }) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        errorMsg
      };
    }
  )
);
export function reducer(state: JobInfoState | undefined, action: Action) {
  return jobInfoReducer(state, action);
}
export const selectJobInfoLoading = (state: JobInfoState) => state.loading;
export const selectJobInfoLoaded = (state: JobInfoState) => state.loaded;
export const selectJobInfoErrorMsg = (state: JobInfoState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectJobInfoIds = selectIds;
export const selectJobInfoEntities = selectEntities;
export const selectAllJobInfos = selectAll;
export const selectJobInfoTotal = selectTotal;
