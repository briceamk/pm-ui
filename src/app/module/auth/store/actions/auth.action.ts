import { createAction, props } from '@ngrx/store';
import {SignInRequest, SignInResponse, SignUpRequest} from '@module/auth/models';

export const SignIn = createAction(
  '[Sign In Page] Sign In Request',
  props<{ signInRequest: SignInRequest }>()
);

export const SignInSuccess = createAction(
  '[Auth API] SignIn Success',
  props<{ signInResponse: SignInResponse }>()
);

export const SignInFail = createAction(
  '[Auth API] Sign In Fail',
  props<{ errorMsg: any }>()
);

export const SetCurrentProfile = createAction(
  '[Auth Effect] Set Current Profile ',
  props<{ signInResponse: SignInResponse }>()
);

export const RefreshCurrentProfile = createAction(
  '[Auth Effect] Refresh Current Profile ',
  props<{ signInResponse: SignInResponse }>()
);

export const SignUp = createAction(
  '[Sign Page] SignUp Request',
  props<{ signUpRequest: SignUpRequest }>()
);

export const SignUpSuccess = createAction(
  '[Auth API] SignUp Success',
  props<{ successMsg: string }>()
);

export const SignUpFail = createAction(
  '[Auth API] SignUp Fail',
  props<{ errorMsg: any }>()
);

export const SignOut = createAction('[Auth API] SignOut');
export const SignOutSuccess = createAction('[Auth API] SignOut Success');
export const CheckIfAccessTokenIsExpired = createAction(
  '[Auth API] Verify Token',
  props<{ signInResponse: SignInResponse }>()
);

export const AccessTokenIsNotExpired = createAction(
  '[Auth Effects] Access Token Is Not Expired',
  props<{ accessTokenIsNotExpired: boolean }>()

);

export const NoLoggedIn = createAction('[Auth Effects] No Logged In');
