import { createAction, props } from '@ngrx/store';
import { Level } from '@module/organization/models'
import { Update } from '@ngrx/entity';

export const LoadLevels = createAction(
  '[Level List Page] Load Levels '
);
export const LoadLevelsSuccess = createAction(
  '[Level API] Load Levels Success',
  props<{ levels: Level[] }>()
);
export const LoadLevelsFail = createAction(
  '[Level API] Load Levels Fail',
  props<{ errorMsg: any }>()
);

export const CreateLevel = createAction(
  '[Level Form Page] Create Level ',
  props<{ level: Level }>()
);
export const CreateLevelSuccess = createAction(
  '[Level API] Create Level Success',
  props<{ level: Level }>()
);
export const CreateLevelFail = createAction(
  '[Level API] Create Level Fail',
  props<{ errorMsg: any }>()
);
export const UpdateLevel = createAction(
  '[Level Form Page] Update Level ',
  props<{ level: Level }>()
);
export const UpdateLevelSuccess = createAction(
  '[Level API] Update Level Success',
  props<{ level: Update<Level> }>()
);
export const UpdateLevelFail = createAction(
  '[Level API] Update Level Fail',
  props<{ errorMsg: any }>()
);

export const RemoveLevel = createAction(
  '[Level Form Page] Remove Level ',
  props<{ ids: string[] }>()
);
export const RemoveLevelSuccess = createAction(
  '[Level API] Remove Level Success',
  props<{ ids: string[] }>()
);
export const RemoveLevelFail = createAction(
  '[Level API] Remove Level Fail',
  props<{ errorMsg: any }>()
);


export const RemoveLevels = createAction(
  '[Level List Page] Remove Levels ',
  props<{ ids: string[] }>()
);
export const RemoveLevelsSuccess = createAction(
  '[Level API] Remove Levels Success',
  props<{ ids: string[] }>()
);
export const RemoveLevelsFail = createAction(
  '[Level API] Remove Levels Fails',
  props<{ errorMsg: any }>()
);
