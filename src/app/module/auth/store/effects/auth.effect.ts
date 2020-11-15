import { Injectable } from '@angular/core';

import {Actions, ofType, createEffect} from '@ngrx/effects';
import {defer, of} from 'rxjs';
import {ToastrService} from 'ngx-toastr';

import {
  map,
  exhaustMap,
  catchError,
  tap,
} from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as authActions from '@module/auth/store/actions/auth.action';
import * as fromServices from '@module/auth/services';
import { SignInResponse } from '@module/auth/models';
import {ResponseApi} from '@share/models';


@Injectable()
export class AuthEffects {
  constructor(
    private _actions$: Actions,
    private _authService: fromServices.AuthService,
    private _toastr: ToastrService
  ) {}

  signIn$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.SignIn),
      exhaustMap(action =>
        this._authService.signIn(action.signInRequest).pipe(
          map((signInResponse: SignInResponse) =>
            authActions.SignInSuccess({ signInResponse })
          ),
          tap(() => this._toastr.info('Vous êtes connecté', 'PM App')),
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

  signInSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.SignInSuccess),
      tap((action) => this._authService.backupToken(action.signInResponse)),
      tap((action) => new Promise( resolve => setTimeout(resolve, 2000) )),
      map(() => fromRoot.GO({ path: [''] })),
    )
  );

  signUp$ = createEffect(() =>
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

  signOut$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.SignOut),
      exhaustMap(action =>
        this._authService.signOut().pipe(
          map(() => authActions.SignOutSuccess()),
          tap(() => {
            this._toastr.info('Vous êtes deconnecté!', 'Payroll App');
          }),
          catchError((error: any) => of(null))
        )
      )
    )
  );

  signOutSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.SignOutSuccess),
      map(() => fromRoot.GO({ path: ['/auth/sign-in'] }))
    )
  );

  checkIfAccessTokenExpired= createEffect(() =>
    this._actions$.pipe(
      ofType(authActions.CheckIfAccessTokenIsExpired),
      exhaustMap(action =>
        this._authService.isAccessTokenExpired(action.signInResponse.accessToken).pipe(
          map((isExpired: boolean) => isExpired? authActions.SignOut(): authActions.AccessTokenIsNotExpired({ accessTokenIsNotExpired: !isExpired})),
          catchError((error: any) => of(null))
        )
      )
    )
  );

 init$ = createEffect(() =>
    defer(() => {
      let accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const signInResponse: SignInResponse = this._authService.extractProfileDto(accessToken);
        if(signInResponse != null)
          return of(authActions.RefreshCurrentProfile({ signInResponse }));
        return of(authActions.SignOut());
      }
    })
 );

}
