import { createAction, props } from '@ngrx/store';
import { Function } from '@module/organization/models'
import { Update } from '@ngrx/entity';

export const LoadFunctions = createAction(
  '[Function List Page] Load Functions '
);
export const LoadFunctionsSuccess = createAction(
  '[Function API] Load Functions Success',
  props<{ _functions: Function[] }>()
);
export const LoadFunctionsFail = createAction(
  '[Function API] Load Functions Fail',
  props<{ errorMsg: any }>()
);

export const CreateFunction = createAction(
  '[Function Form Page] Create Function ',
  props<{ _function: Function }>()
);
export const CreateFunctionSuccess = createAction(
  '[Function API] Create Function Success',
  props<{ _function: Function }>()
);
export const CreateFunctionFail = createAction(
  '[Function API] Create Function Fail',
  props<{ errorMsg: any }>()
);
export const UpdateFunction = createAction(
  '[Function Form Page] Update Function ',
  props<{ _function: Function }>()
);
export const UpdateFunctionSuccess = createAction(
  '[Function API] Update Function Success',
  props<{ _function: Update<Function> }>()
);
export const UpdateFunctionFail = createAction(
  '[Function API] Update Function Fail',
  props<{ errorMsg: any }>()
);

export const RemoveFunction = createAction(
  '[Function Form Page] Remove Function ',
  props<{ ids: string[] }>()
);
export const RemoveFunctionSuccess = createAction(
  '[Function API] Remove Function Success',
  props<{ ids: string[] }>()
);
export const RemoveFunctionFail = createAction(
  '[Function API] Remove Function Fail',
  props<{ errorMsg: any }>()
);


export const RemoveFunctions = createAction(
  '[Function List Page] Remove Functions ',
  props<{ ids: string[] }>()
);
export const RemoveFunctionsSuccess = createAction(
  '[Function API] Remove Functions Success',
  props<{ ids: string[] }>()
);
export const RemoveFunctionsFail = createAction(
  '[Function API] Remove Functions Fails',
  props<{ errorMsg: any }>()
);
