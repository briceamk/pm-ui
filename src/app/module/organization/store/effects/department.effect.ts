import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as departmentActions from '@module/organization/store/actions/department.action';
import * as fromServices from '@module/organization/services';
import { Department } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class DepartmentEffect {
  constructor(
    private _actions$: Actions,
    private _departmentService: fromServices.DepartmentService,
    private _toastr: ToastrService
  ) {}

  loadDepartments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(departmentActions.LoadDepartments),
      exhaustMap(() =>
        this._departmentService.findAll().pipe(
          map((departments: any) =>
            departmentActions.LoadDepartmentsSuccess({ departments: departments['content'] as Department[]})
          ),
          catchError((error: any) =>
            of(
              departmentActions.LoadDepartmentsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createDepartment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(departmentActions.CreateDepartment),
      mergeMap(({ department }) =>
        this._departmentService.create(department).pipe(
          map((newDepartment: Department) =>
            departmentActions.CreateDepartmentSuccess({ department: newDepartment })
          ),
          tap(() => {
            this._toastr.success('Département crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              departmentActions.CreateDepartmentFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createDepartmentSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(departmentActions.CreateDepartmentSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/departments/details', action.department.id]
        });
      })
    )
  );

  updateDepartment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(departmentActions.UpdateDepartment),
      exhaustMap(action =>
        this._departmentService.update(action.department).pipe(
          map((department: Department) =>
            departmentActions.UpdateDepartmentSuccess({
              department: { id: department.id, changes: department }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Département mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              departmentActions.UpdateDepartmentFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeDepartment$ = createEffect(() =>
    this._actions$.pipe(
      ofType(departmentActions.RemoveDepartment),
      exhaustMap(action =>
        this._departmentService.removes(action.ids).pipe(
          map((ids: string[]) =>
            departmentActions.RemoveDepartmentSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Département supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              departmentActions.RemoveDepartmentFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeDepartmentSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(departmentActions.RemoveDepartmentSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/departments/new']
        });
      })
    )
  );


  removeDepartments$ = createEffect(() =>
    this._actions$.pipe(
      ofType(departmentActions.RemoveDepartments),
      exhaustMap(action =>
        this._departmentService.removes(action.ids).pipe(
          map((ids: string[]) =>
            departmentActions.RemoveDepartmentsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Départements supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              departmentActions.RemoveDepartmentsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
