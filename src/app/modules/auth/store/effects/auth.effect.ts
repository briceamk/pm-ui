import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of, defer, Observable, timer } from 'rxjs';
import {
  map,
  exhaustMap,
  catchError,
  mergeMap,
  tap,
  switchMap
} from 'rxjs/operators';

import * as fromRoot from '../../../store';
import * as authActions from '../actions/auth.action';
import * as fromServices from '../../services';
import { ResponseApi, SignInResponse} from '../../models';

@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authService: fromServices.AuthService
  ) {}

  signIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.SignIn),
      exhaustMap(action =>
        this._authService.signIn(action.signInRequest).pipe(
          map((signInResponse: SignInResponse) =>
            authActions.SignInSuccess({ signInResponse })
          ),
          tap(() => fromRoot.GO({ path: ['pages'] })),
          catchError((error: any) =>
            of(
              authActions.SignInFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  signUp = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.SignUp),
      exhaustMap(action =>
        this._authService.signUp(action.signUpRequest).pipe(
          map((responseApi: ResponseApi) =>
            authActions.SignUpSuccess({
              successMsg: responseApi.message
            })
          ),
          catchError((error: any) =>
            of(
              authActions.SignUpFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
  signUpSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.SignUpSuccess),
      map(() => fromRoot.GO({ path: ['/auth/sign-in'] }))
    )
  );
}
