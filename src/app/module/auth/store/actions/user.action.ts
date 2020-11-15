import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {User} from '@module/auth/models';


export const LoadUsers = createAction(
  '[User List Page] Load Users '
);
export const LoadUsersSuccess = createAction(
  '[User API] Load Users Success',
  props<{ users: User[] }>()
);
export const LoadUsersFail = createAction(
  '[User API] Load Users Fail',
  props<{ errorMsg: any }>()
);

export const CreateUser = createAction(
  '[User Form Page] Create User ',
  props<{ user: User }>()
);
export const CreateUserSuccess = createAction(
  '[User API] Create User Success',
  props<{ user: User }>()
);
export const CreateUserFail = createAction(
  '[User API] Create User Fail',
  props<{ errorMsg: any }>()
);
export const UpdateUser = createAction(
  '[User Form Page] Update User ',
  props<{ user: User }>()
);
export const UpdateUserSuccess = createAction(
  '[User API] Update User Success',
  props<{ user: Update<User> }>()
);
export const UpdateUserFail = createAction(
  '[User API] Update User Fail',
  props<{ errorMsg: any }>()
);

export const RemoveUser = createAction(
  '[User Form Page] Remove User ',
  props<{ ids: string[] }>()
);
export const RemoveUserSuccess = createAction(
  '[User API] Remove User Success',
  props<{ ids: string[] }>()
);
export const RemoveUserFail = createAction(
  '[User API] Remove User Fail',
  props<{ errorMsg: any }>()
);


export const RemoveUsers = createAction(
  '[User List Page] Remove Users ',
  props<{ ids: string[] }>()
);
export const RemoveUsersSuccess = createAction(
  '[User API] Remove Users Success',
  props<{ ids: string[] }>()
);
export const RemoveUsersFail = createAction(
  '[User API] Remove Users Fails',
  props<{ errorMsg: any }>()
);
