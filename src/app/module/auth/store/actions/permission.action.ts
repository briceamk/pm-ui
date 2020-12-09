import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Permission} from '@module/auth/models';


export const LoadPermissions = createAction(
  '[Permission List Page] Load Permissions '
);
export const LoadPermissionsSuccess = createAction(
  '[Permission API] Load Permissions Success',
  props<{ permissions: Permission[] }>()
);
export const LoadPermissionsFail = createAction(
  '[Permission API] Load Permissions Fail',
  props<{ errorMsg: any }>()
);

export const CreatePermission = createAction(
  '[Permission Form Page] Create Permission ',
  props<{ permission: Permission }>()
);
export const CreatePermissionSuccess = createAction(
  '[Permission API] Create Permission Success',
  props<{ permission: Permission }>()
);
export const CreatePermissionFail = createAction(
  '[Permission API] Create Permission Fail',
  props<{ errorMsg: any }>()
);
export const UpdatePermission = createAction(
  '[Permission Form Page] Update Permission ',
  props<{ permission: Permission }>()
);
export const UpdatePermissionSuccess = createAction(
  '[Permission API] Update Permission Success',
  props<{ permission: Update<Permission> }>()
);
export const UpdatePermissionFail = createAction(
  '[Permission API] Update Permission Fail',
  props<{ errorMsg: any }>()
);

export const RemovePermission = createAction(
  '[Permission Form Page] Remove Permission ',
  props<{ ids: string[] }>()
);
export const RemovePermissionSuccess = createAction(
  '[Permission API] Remove Permission Success',
  props<{ ids: string[] }>()
);
export const RemovePermissionFail = createAction(
  '[Permission API] Remove Permission Fail',
  props<{ errorMsg: any }>()
);


export const RemovePermissions = createAction(
  '[Permission List Page] Remove Permissions ',
  props<{ ids: string[] }>()
);
export const RemovePermissionsSuccess = createAction(
  '[Permission API] Remove Permissions Success',
  props<{ ids: string[] }>()
);
export const RemovePermissionsFail = createAction(
  '[Permission API] Remove Permissions Fails',
  props<{ errorMsg: any }>()
);
