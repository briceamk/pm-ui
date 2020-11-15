import { createSelector } from '@ngrx/store';

import * as fromFeature from '@module/auth/store/reducers';
import * as fromAuth from '@module/auth/store/reducers/auth.reducer';

export const selectAuthState = createSelector(
  fromFeature.selectSecurityState,
  (state: fromFeature.SecurityState) => state.auth
);

export const selectAuthErrorMsg = createSelector(
  selectAuthState,
  fromAuth.selectAuthErrorMsg
);
export const selectAuthProfile = createSelector(
  selectAuthState,
  fromAuth.selectAuthProfile
);
export const selectSuccessMsg = createSelector(
  selectAuthState,
  fromAuth.selectAuthSuccessMsg
);
export const selectAuthLoggedIn = createSelector(
  selectAuthState,
  fromAuth.selectAuthLoggedIn
);
export const selectAuthLoading = createSelector(
  selectAuthState,
  fromAuth.selectAuthLoading
);
export const selectAccessTokenIsNotExpired = createSelector(
  selectAuthState,
  fromAuth.selectAccessTokenIsNotExpired
);
