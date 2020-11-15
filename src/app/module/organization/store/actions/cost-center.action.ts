import { createAction, props } from '@ngrx/store';
import { CostCenter } from '@module/organization/models'
import { Update } from '@ngrx/entity';

export const LoadCostCenters = createAction(
  '[CostCenter List Page] Load CostCenters '
);
export const LoadCostCentersSuccess = createAction(
  '[CostCenter API] Load CostCenters Success',
  props<{ costCenters: CostCenter[] }>()
);
export const LoadCostCentersFail = createAction(
  '[CostCenter API] Load CostCenters Fail',
  props<{ errorMsg: any }>()
);

export const CreateCostCenter = createAction(
  '[CostCenter Form Page] Create CostCenter ',
  props<{ costCenter: CostCenter }>()
);
export const CreateCostCenterSuccess = createAction(
  '[CostCenter API] Create CostCenter Success',
  props<{ costCenter: CostCenter }>()
);
export const CreateCostCenterFail = createAction(
  '[CostCenter API] Create CostCenter Fail',
  props<{ errorMsg: any }>()
);
export const UpdateCostCenter = createAction(
  '[CostCenter Form Page] Update CostCenter ',
  props<{ costCenter: CostCenter }>()
);
export const UpdateCostCenterSuccess = createAction(
  '[CostCenter API] Update CostCenter Success',
  props<{ costCenter: Update<CostCenter> }>()
);
export const UpdateCostCenterFail = createAction(
  '[CostCenter API] Update CostCenter Fail',
  props<{ errorMsg: any }>()
);

export const RemoveCostCenter = createAction(
  '[CostCenter Form Page] Remove CostCenter ',
  props<{ ids: string[] }>()
);
export const RemoveCostCenterSuccess = createAction(
  '[CostCenter API] Remove CostCenter Success',
  props<{ ids: string[] }>()
);
export const RemoveCostCenterFail = createAction(
  '[CostCenter API] Remove CostCenter Fail',
  props<{ errorMsg: any }>()
);


export const RemoveCostCenters = createAction(
  '[CostCenter List Page] Remove CostCenters ',
  props<{ ids: string[] }>()
);
export const RemoveCostCentersSuccess = createAction(
  '[CostCenter API] Remove CostCenters Success',
  props<{ ids: string[] }>()
);
export const RemoveCostCentersFail = createAction(
  '[CostCenter API] Remove CostCenters Fails',
  props<{ errorMsg: any }>()
);
