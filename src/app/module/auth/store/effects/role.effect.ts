import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import { ToastrService } from 'ngx-toastr';


import * as fromRoot from '@store/index';
import * as roleActions from '@module/auth/store//actions/role.action';
import * as fromServices from '@module/auth/services';
import { Role } from '@module/auth/models';


@Injectable()
export class RoleEffect {
  constructor(
    private _actions$: Actions,
    private _roleService: fromServices.RoleService,
    private _toastr: ToastrService
  ) {}

  loadRoles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.LoadRoles),
      exhaustMap(() =>
        this._roleService.findAll().pipe(
          map((roles: any) =>
            roleActions.LoadRolesSuccess({ roles: roles['content'] as Role[]})
          ),
          catchError((error: any) =>
            of(
              roleActions.LoadRolesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createRole$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.CreateRole),
      mergeMap(({ role }) =>
        this._roleService.create(role).pipe(
          map((newRole: Role) =>
            roleActions.CreateRoleSuccess({ role: newRole })
          ),
          tap(() => {
            this._toastr.success('Utilisateur crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              roleActions.CreateRoleFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createRoleSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.CreateRoleSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/auth/roles/details', action.role.id]
        });
      })
    )
  );

  updateRole$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.UpdateRole),
      exhaustMap(action =>
        this._roleService.update(action.role).pipe(
          map((role: Role) =>
            roleActions.UpdateRoleSuccess({
              role: { id: role.id, changes: role }
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
              roleActions.UpdateRoleFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeRole$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.RemoveRole),
      exhaustMap(action =>
        this._roleService.removes(action.ids).pipe(
          map((ids: string[]) =>
            roleActions.RemoveRoleSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Utilisateur supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              roleActions.RemoveRoleFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeRoleSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.RemoveRoleSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/auth/roles/new']
        });
      })
    )
  );

  removeRoles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.RemoveRoles),
      exhaustMap(action =>
        this._roleService.removes(action.ids).pipe(
          map((ids: string[]) =>
            roleActions.RemoveRolesSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Utilisateurs supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              roleActions.RemoveRolesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
