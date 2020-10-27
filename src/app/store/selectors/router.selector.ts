import { createSelector } from '@ngrx/store';

import * as fromRouter from '../reducers';

export const selectRouterState = createSelector(
  fromRouter.selectRootRouterState,
  (router: any) => router && router.state
);

export const selectRouterUrl = createSelector(
  selectRouterState,
  (state: fromRouter.RouterStateUrl) => state.url
);
export const selectRouterParams = createSelector(
  selectRouterState,
  (state: fromRouter.RouterStateUrl) => state.params
);
export const selectRouterQueryParams = createSelector(
  selectRouterState,
  (state: fromRouter.RouterStateUrl) => state.queryParams
);
