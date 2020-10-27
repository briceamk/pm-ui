import { createReducer, on, Action } from '@ngrx/store';

import * as fromAuth from '../actions/auth.action';
import { SignInResponse } from '../../models';

export interface AuthState {
  profile?: SignInResponse;
  loggedIn?: boolean;
  successMsg: string;
  errorMsg?: any;
}

export const initialState: AuthState = {
  profile: null,
  loggedIn: false,
  successMsg: null,
  errorMsg: null
};
export const authReducer = createReducer(
  initialState,
  on(fromAuth.SignInSuccess, (state, { signInResponse }) => {
    return {
      ...state,
      user: null,
      loggedIn: true,
      profile: signInResponse,
      successMsg: null,
      errorMsg: null
    };
  }),
  on(
    fromAuth.SetCurrentProfile,
    fromAuth.RefreshCurrentProfile,
    (state, { signInResponse }) => {
      return {
        ...state,
        profile: signInResponse,
        loggedIn: true,
        successMsg: null,
        errorMsg: null
      };
    }
  ),
  on(fromAuth.SignUpSuccess, (state, { successMsg }) => {
    return {
      ...state,
      profile: null,
      loggedIn: false,
      successMsg: successMsg,
      errorMsg: null
    };
  }),
  on(fromAuth.SignOutSuccess, state => {
    return {
      ...state,
      profile: null,
      loggedIn: false,
      successMsg: null,
      errorMsg: null
    };
  }),
  on(
    fromAuth.SignInFail,
    fromAuth.SignUpFail,
    (state, { errorMsg }) => {
      return {
        ...state,
        profile: null,
        loggedIn: false,
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
export const selectAuthSuccessMsg = (state: AuthState) => state.successMsg;
export const selectAuthErrorMsg = (state: AuthState) => state.errorMsg;
