import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '@module/auth/store/actions/auth.action';
import { SignInResponse } from '@module/auth/models';

export interface AuthState {
  profile?: SignInResponse;
  loggedIn?: boolean;
  loading?: boolean;
  accessTokenIsNotExpired?: boolean;
  successMsg: string;
  errorMsg?: any;
}

export const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  loading: false,
  accessTokenIsNotExpired: false,
  successMsg: null,
  errorMsg: null
};
export const authReducer = createReducer(
  initialState,
  on(fromActions.SignIn, (state, { signInRequest }) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(fromActions.SignInSuccess, (state, { signInResponse }) => {
    return {
      ...state,
      user: null,
      loggedIn: true,
      loading: false,
      accessTokenIsNotExpired: true,
      profile: signInResponse,
      successMsg: null,
      errorMsg: null
    };
  }),
  on(
    fromActions.SetCurrentProfile,
    fromActions.RefreshCurrentProfile,
    (state, { signInResponse }) => {
      return {
        ...state,
        profile: signInResponse,
        accessTokenIsNotExpired: true,
        loggedIn: true,
        loading: false,
        successMsg: null,
        errorMsg: null
      };
    }
  ),
  on(fromActions.SignUp, (state, { signUpRequest }) => {
    return {
      ...state,
      loading: true
    };
  }),
  on(fromActions.SignUpSuccess, (state, { successMsg }) => {
    return {
      ...state,
      profile: null,
      loggedIn: false,
      loading: false,
      accessTokenIsNotExpired: false,
      successMsg: successMsg,
      errorMsg: null
    };
  }),
  on(fromActions.SignOutSuccess, state => {
    return {
      ...state,
      profile: null,
      accessTokenIsNotExpired: false,
      loggedIn: false,
      loading: false,
      successMsg: null,
      errorMsg: null
    };
  }),
  on(fromActions.AccessTokenIsNotExpired, (state, {accessTokenIsNotExpired}) => {
    return {
      ...state,
      accessTokenIsNotExpired: accessTokenIsNotExpired
    };
  }),
  on(
    fromActions.SignInFail,
    fromActions.SignUpFail,
    (state, { errorMsg }) => {
      return {
        ...state,
        profile: null,
        loggedIn: false,
        loading: false,
        accessTokenIsNotExpired: false,
        successMsg: null,
        errorMsg
      };
    }
  )
);

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}

export const selectAuthProfile = (state: AuthState) => state.profile;
export const selectAuthLoggedIn = (state: AuthState) => state.loggedIn;
export const selectAuthLoading = (state: AuthState) => state.loading;
export const selectAccessTokenIsNotExpired = (state: AuthState) => state.accessTokenIsNotExpired;
export const selectAuthSuccessMsg = (state: AuthState) => state.successMsg;
export const selectAuthErrorMsg = (state: AuthState) => state.errorMsg;
