import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../store';
import * as fromFeature from '../reducers';
import * as fromAuth from '../reducers/auth.reducer';

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
