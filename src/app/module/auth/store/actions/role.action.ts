import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Role} from '@module/auth/models';


export const LoadRoles = createAction(
  '[Role List Page] Load Roles '
);
export const LoadRolesSuccess = createAction(
  '[Role API] Load Roles Success',
  props<{ roles: Role[] }>()
);
export const LoadRolesFail = createAction(
  '[Role API] Load Roles Fail',
  props<{ errorMsg: any }>()
);

export const CreateRole = createAction(
  '[Role Form Page] Create Role ',
  props<{ role: Role }>()
);
export const CreateRoleSuccess = createAction(
  '[Role API] Create Role Success',
  props<{ role: Role }>()
);
export const CreateRoleFail = createAction(
  '[Role API] Create Role Fail',
  props<{ errorMsg: any }>()
);
export const UpdateRole = createAction(
  '[Role Form Page] Update Role ',
  props<{ role: Role }>()
);
export const UpdateRoleSuccess = createAction(
  '[Role API] Update Role Success',
  props<{ role: Update<Role> }>()
);
export const UpdateRoleFail = createAction(
  '[Role API] Update Role Fail',
  props<{ errorMsg: any }>()
);

export const RemoveRole = createAction(
  '[Role Form Page] Remove Role ',
  props<{ ids: string[] }>()
);
export const RemoveRoleSuccess = createAction(
  '[Role API] Remove Role Success',
  props<{ ids: string[] }>()
);
export const RemoveRoleFail = createAction(
  '[Role API] Remove Role Fail',
  props<{ errorMsg: any }>()
);


export const RemoveRoles = createAction(
  '[Role List Page] Remove Roles ',
  props<{ ids: string[] }>()
);
export const RemoveRolesSuccess = createAction(
  '[Role API] Remove Roles Success',
  props<{ ids: string[] }>()
);
export const RemoveRolesFail = createAction(
  '[Role API] Remove Roles Fails',
  props<{ errorMsg: any }>()
);
