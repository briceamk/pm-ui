import { InjectionToken } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Params,
} from '@angular/router';
import {
  createFeatureSelector,
  ActionReducerMap,
  Action,
  ActionReducer,
  MetaReducer,
  createSelector,
} from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import { environment } from '../../../environments/environment';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

export const reducers = new InjectionToken<ActionReducerMap<State, Action>>(
  'Root reducers token',
  {
    factory: () => ({
      router: fromRouter.routerReducer,
    }),
  },
);

export const selectRootState = createFeatureSelector<State>('router');
export const selectRootRouterState = createSelector(
  selectRootState,
  (state: State) => state,
);

// console.log all actions
export function logger(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state, action) => {
    const result = reducer(state, action);
    console.groupCollapsed(action.type);
    console.log('prev state', state);
    console.log('action', action);
    console.log('next state', result);
    console.groupEnd();

    return result;
  };
}

// reset store when user logout
export function clearState(
  reducer: ActionReducer<State>
): ActionReducer<State> {
  return (state, action) => {
    if (action.type === '[Auth API] SignOut Success') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

/**
 * By default, @ngrx/store uses combineReducers with the reducer map to compose
 * the root meta-reducer. To add more meta-reducers, provide an array of meta-reducers
 * that will be composed to form the root meta-reducer.
 */
export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [clearState]
  : [clearState];

export class CustomSerializer
  implements fromRouter.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }
    const { params } = state;

    return { url, queryParams, params };
  }
}
