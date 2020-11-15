import { createAction, props } from '@ngrx/store';
import { JobInfo } from '@module/cron/models'
import { Update } from '@ngrx/entity';

export const LoadJobInfos = createAction(
  '[JobInfo List Page] Load JobInfos '
);
export const LoadJobInfosSuccess = createAction(
  '[JobInfo API] Load JobInfos Success',
  props<{ jobInfos: JobInfo[] }>()
);
export const LoadJobInfosFail = createAction(
  '[JobInfo API] Load JobInfos Fail',
  props<{ errorMsg: any }>()
);

export const CreateJobInfo = createAction(
  '[JobInfo Form Page] Create JobInfo ',
  props<{ jobInfo: JobInfo }>()
);
export const CreateJobInfoSuccess = createAction(
  '[JobInfo API] Create JobInfo Success',
  props<{ jobInfo: JobInfo }>()
);
export const CreateJobInfoFail = createAction(
  '[JobInfo API] Create JobInfo Fail',
  props<{ errorMsg: any }>()
);
export const UpdateJobInfo = createAction(
  '[JobInfo Form Page] Update JobInfo ',
  props<{ jobInfo: JobInfo }>()
);
export const UpdateJobInfoSuccess = createAction(
  '[JobInfo API] Update JobInfo Success',
  props<{ jobInfo: Update<JobInfo> }>()
);
export const UpdateJobInfoFail = createAction(
  '[JobInfo API] Update JobInfo Fail',
  props<{ errorMsg: any }>()
);

export const RemoveJobInfo = createAction(
  '[JobInfo List & Form Page] Remove JobInfo ',
  props<{ ids: string[] }>()
);
export const RemoveJobInfoSuccess = createAction(
  '[JobInfo API] Remove JobInfo Success',
  props<{ ids: string[] }>()
);
export const RemoveJobInfoFail = createAction(
  '[JobInfo API] Remove JobInfo Fail',
  props<{ errorMsg: any }>()
);

export const RemoveJobInfos = createAction(
  '[JobInfo List & Form Page] Remove JobInfos ',
  props<{ ids: string[] }>()
);
export const RemoveJobInfosSuccess = createAction(
  '[JobInfo API] Remove JobInfos Success',
  props<{ ids: string[] }>()
);
export const RemoveJobInfosFail = createAction(
  '[JobInfo API] Remove JobInfos Fail',
  props<{ errorMsg: any }>()
);
