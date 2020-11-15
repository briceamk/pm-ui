import { createAction, props } from '@ngrx/store';
import { Charge } from '@module/organization/models'
import { Update } from '@ngrx/entity';

export const LoadCharges = createAction(
  '[Charge List Page] Load Charges '
);
export const LoadChargesSuccess = createAction(
  '[Charge API] Load Charges Success',
  props<{ charges: Charge[] }>()
);
export const LoadChargesFail = createAction(
  '[Charge API] Load Charges Fail',
  props<{ errorMsg: any }>()
);

export const CreateCharge = createAction(
  '[Charge Form Page] Create Charge ',
  props<{ charge: Charge }>()
);
export const CreateChargeSuccess = createAction(
  '[Charge API] Create Charge Success',
  props<{ charge: Charge }>()
);
export const CreateChargeFail = createAction(
  '[Charge API] Create Charge Fail',
  props<{ errorMsg: any }>()
);
export const UpdateCharge = createAction(
  '[Charge Form Page] Update Charge ',
  props<{ charge: Charge }>()
);
export const UpdateChargeSuccess = createAction(
  '[Charge API] Update Charge Success',
  props<{ charge: Update<Charge> }>()
);
export const UpdateChargeFail = createAction(
  '[Charge API] Update Charge Fail',
  props<{ errorMsg: any }>()
);

export const RemoveCharge = createAction(
  '[Charge Form Page] Remove Charge ',
  props<{ ids: string[] }>()
);
export const RemoveChargeSuccess = createAction(
  '[Charge API] Remove Charge Success',
  props<{ ids: string[] }>()
);
export const RemoveChargeFail = createAction(
  '[Charge API] Remove Charge Fail',
  props<{ errorMsg: any }>()
);


export const RemoveCharges = createAction(
  '[Charge List Page] Remove Charges ',
  props<{ ids: string[] }>()
);
export const RemoveChargesSuccess = createAction(
  '[Charge API] Remove Charges Success',
  props<{ ids: string[] }>()
);
export const RemoveChargesFail = createAction(
  '[Charge API] Remove Charges Fails',
  props<{ errorMsg: any }>()
);
