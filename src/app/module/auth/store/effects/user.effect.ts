import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';


import * as fromRoot from '@store/index';
import * as userActions from '@module/auth/store//actions/user.action';
import * as fromServices from '@module/auth/services';
import { User } from '@module/auth/models';


@Injectable()
export class UserEffect {
  constructor(
    private _actions$: Actions,
    private _userService: fromServices.UserService,
    private _toastr: ToastrService
  ) {}

  loadUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.LoadUsers),
      exhaustMap(() =>
        this._userService.findAll().pipe(
          map((users: any) =>
            userActions.LoadUsersSuccess({ users: users['content'] as User[]})
          ),
          catchError((error: any) =>
            of(
              userActions.LoadUsersFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.CreateUser),
      mergeMap(({ user }) =>
        this._userService.create(user).pipe(
          map((newUser: User) =>
            userActions.CreateUserSuccess({ user: newUser })
          ),
          tap(() => {
            this._toastr.success('Utilisateur crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              userActions.CreateUserFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createUserSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.CreateUserSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/auth/users/details', action.user.id]
        });
      })
    )
  );

  updateUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.UpdateUser),
      exhaustMap(action =>
        this._userService.update(action.user).pipe(
          map((user: User) =>
            userActions.UpdateUserSuccess({
              user: { id: user.id, changes: user }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Utilisateur mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              userActions.UpdateUserFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeUser$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.RemoveUser),
      exhaustMap(action =>
        this._userService.removes(action.ids).pipe(
          map((ids: string[]) =>
            userActions.RemoveUserSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Utilisateur supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              userActions.RemoveUserFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeUserSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.RemoveUserSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/auth/users/new']
        });
      })
    )
  );

  removeUsers$ = createEffect(() =>
    this._actions$.pipe(
      ofType(userActions.RemoveUsers),
      exhaustMap(action =>
        this._userService.removes(action.ids).pipe(
          map((ids: string[]) =>
            userActions.RemoveUsersSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Utilisateurs supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              userActions.RemoveUsersFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
