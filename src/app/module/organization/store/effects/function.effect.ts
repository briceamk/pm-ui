import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as functionActions from '@module/organization/store/actions/function.action';
import * as fromServices from '@module/organization/services';
import { Function } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class FunctionEffect {
  constructor(
    private _actions$: Actions,
    private _functionService: fromServices.FunctionService,
    private _toastr: ToastrService
  ) {}

  loadFunctions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(functionActions.LoadFunctions),
      exhaustMap(() =>
        this._functionService.findAll().pipe(
          map((_functions: any) =>
            functionActions.LoadFunctionsSuccess({ _functions: _functions['content'] as Function[]})
          ),
          catchError((error: any) =>
            of(
              functionActions.LoadFunctionsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createFunction$ = createEffect(() =>
    this._actions$.pipe(
      ofType(functionActions.CreateFunction),
      mergeMap(({ _function }) =>
        this._functionService.create(_function).pipe(
          map((newFunction: Function) =>
            functionActions.CreateFunctionSuccess({ _function: newFunction })
          ),
          tap(() => {
            this._toastr.success('Role crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              functionActions.CreateFunctionFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createFunctionSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(functionActions.CreateFunctionSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/functions/details', action._function.id]
        });
      })
    )
  );

  updateFunction$ = createEffect(() =>
    this._actions$.pipe(
      ofType(functionActions.UpdateFunction),
      exhaustMap(action =>
        this._functionService.update(action._function).pipe(
          map((_function: Function) =>
            functionActions.UpdateFunctionSuccess({
              _function: { id: _function.id, changes: _function }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Role mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              functionActions.UpdateFunctionFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeFunction$ = createEffect(() =>
    this._actions$.pipe(
      ofType(functionActions.RemoveFunction),
      exhaustMap(action =>
        this._functionService.removes(action.ids).pipe(
          map((ids: string[]) =>
            functionActions.RemoveFunctionSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Role supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              functionActions.RemoveFunctionFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeFunctionSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(functionActions.RemoveFunctionSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/functions/new']
        });
      })
    )
  );


  removeFunctions$ = createEffect(() =>
    this._actions$.pipe(
      ofType(functionActions.RemoveFunctions),
      exhaustMap(action =>
        this._functionService.removes(action.ids).pipe(
          map((ids: string[]) =>
            functionActions.RemoveFunctionsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Roles supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              functionActions.RemoveFunctionsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
