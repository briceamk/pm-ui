import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';


import * as fromRoot from '@store/index';
import * as permissionActions from '@module/auth/store/actions/permission.action';
import * as fromServices from '@module/auth/services';
import { Permission } from '@module/auth/models';


@Injectable()
export class PermissionEffect {
  constructor(
    private _actions$: Actions,
    private _permissionService: fromServices.PermissionService,
    private _toastr: ToastrService
  ) {}

  loadPermissions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(permissionActions.LoadPermissions),
      exhaustMap(() =>
        this._permissionService.findAll().pipe(
          map((permissions: any) =>
            permissionActions.LoadPermissionsSuccess({ permissions: permissions['content'] as Permission[]})
          ),
          catchError((error: any) =>
            of(
              permissionActions.LoadPermissionsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createPermission$ = createEffect(() =>
    this._actions$.pipe(
      ofType(permissionActions.CreatePermission),
      mergeMap(({ permission }) =>
        this._permissionService.create(permission).pipe(
          map((newPermission: Permission) =>
            permissionActions.CreatePermissionSuccess({ permission: newPermission })
          ),
          tap(() => {
            this._toastr.success('Utilisateur crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              permissionActions.CreatePermissionFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createPermissionSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(permissionActions.CreatePermissionSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/auth/permissions/details', action.permission.id]
        });
      })
    )
  );

  updatePermission$ = createEffect(() =>
    this._actions$.pipe(
      ofType(permissionActions.UpdatePermission),
      exhaustMap(action =>
        this._permissionService.update(action.permission).pipe(
          map((permission: Permission) =>
            permissionActions.UpdatePermissionSuccess({
              permission: { id: permission.id, changes: permission }
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
              permissionActions.UpdatePermissionFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removePermission$ = createEffect(() =>
    this._actions$.pipe(
      ofType(permissionActions.RemovePermission),
      exhaustMap(action =>
        this._permissionService.removes(action.ids).pipe(
          map((ids: string[]) =>
            permissionActions.RemovePermissionSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Utilisateur supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              permissionActions.RemovePermissionFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removePermissionSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(permissionActions.RemovePermissionSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/auth/permissions/new']
        });
      })
    )
  );

  removePermissions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(permissionActions.RemovePermissions),
      exhaustMap(action =>
        this._permissionService.removes(action.ids).pipe(
          map((ids: string[]) =>
            permissionActions.RemovePermissionsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Utilisateurs supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              permissionActions.RemovePermissionsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
