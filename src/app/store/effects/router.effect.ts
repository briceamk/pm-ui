import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import * as RouterActions from '@store/actions/router.action';

import { tap } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
  constructor(
    private _actions$: Actions,
    private _router: Router,
    private _location: Location
  ) {}

  navigate$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.GO),
        tap(({ path, query: queryParams, extras }) => {
          this._router.navigate(path, { queryParams, ...extras });
        })
      ),
    { dispatch: false }
  );

  navigateBack$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.BACK),
        tap(() => this._location.back())
      ),
    { dispatch: false }
  );

  navigateForward$ = createEffect(
    () =>
      this._actions$.pipe(
        ofType(RouterActions.FORWARD),
        tap(() => this._location.forward())
      ),
    { dispatch: false }
  );

}
