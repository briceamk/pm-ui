import { createAction, props } from '@ngrx/store';
import { Step } from '@module/organization/models'
import { Update } from '@ngrx/entity';

export const LoadSteps = createAction(
  '[Step List Page] Load Steps '
);
export const LoadStepsSuccess = createAction(
  '[Step API] Load Steps Success',
  props<{ steps: Step[] }>()
);
export const LoadStepsFail = createAction(
  '[Step API] Load Steps Fail',
  props<{ errorMsg: any }>()
);

export const CreateStep = createAction(
  '[Step Form Page] Create Step ',
  props<{ step: Step }>()
);
export const CreateStepSuccess = createAction(
  '[Step API] Create Step Success',
  props<{ step: Step }>()
);
export const CreateStepFail = createAction(
  '[Step API] Create Step Fail',
  props<{ errorMsg: any }>()
);
export const UpdateStep = createAction(
  '[Step Form Page] Update Step ',
  props<{ step: Step }>()
);
export const UpdateStepSuccess = createAction(
  '[Step API] Update Step Success',
  props<{ step: Update<Step> }>()
);
export const UpdateStepFail = createAction(
  '[Step API] Update Step Fail',
  props<{ errorMsg: any }>()
);

export const RemoveStep = createAction(
  '[Step Form Page] Remove Step ',
  props<{ ids: string[] }>()
);
export const RemoveStepSuccess = createAction(
  '[Step API] Remove Step Success',
  props<{ ids: string[] }>()
);
export const RemoveStepFail = createAction(
  '[Step API] Remove Step Fail',
  props<{ errorMsg: any }>()
);


export const RemoveSteps = createAction(
  '[Step List Page] Remove Steps ',
  props<{ ids: string[] }>()
);
export const RemoveStepsSuccess = createAction(
  '[Step API] Remove Steps Success',
  props<{ ids: string[] }>()
);
export const RemoveStepsFail = createAction(
  '[Step API] Remove Steps Fails',
  props<{ errorMsg: any }>()
);
