import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as roleActions from '@module/organization/store/actions/role.action';
import * as fromServices from '@module/organization/services';
import { Role } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class RoleEffect {
  constructor(
    private _actions$: Actions,
    private roleService: fromServices.RoleService,
    private _toastr: ToastrService
  ) {}

  loadRoles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.LoadRoles),
      exhaustMap(() =>
        this.roleService.findAll().pipe(
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
        this.roleService.create(role).pipe(
          map((newRole: Role) =>
            roleActions.CreateRoleSuccess({ role: newRole })
          ),
          tap(() => {
            this._toastr.success('Permission crée correctement', 'PM');
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
          path: ['/organization/roles/details', action.role.id]
        });
      })
    )
  );

  updateRole$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.UpdateRole),
      exhaustMap(action =>
        this.roleService.update(action.role).pipe(
          map((role: Role) =>
            roleActions.UpdateRoleSuccess({
              role: { id: role.id, changes: role }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Permission mis à jour correctement',
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
        this.roleService.removes(action.ids).pipe(
          map((ids: string[]) =>
            roleActions.RemoveRoleSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Permission supprimée correctement',
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
          path: ['/organization/roles/new']
        });
      })
    )
  );


  removeRoles$ = createEffect(() =>
    this._actions$.pipe(
      ofType(roleActions.RemoveRoles),
      exhaustMap(action =>
        this.roleService.removes(action.ids).pipe(
          map((ids: string[]) =>
            roleActions.RemoveRolesSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Roles supprimées correctement',
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
