import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as costCenterActions from '@module/organization/store/actions/cost-center.action';
import * as fromServices from '@module/organization/services';
import { CostCenter } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CostCenterEffect {
  constructor(
    private _actions$: Actions,
    private _costCenterService: fromServices.CostCenterService,
    private _toastr: ToastrService
  ) {}

  loadCostCenters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(costCenterActions.LoadCostCenters),
      exhaustMap(() =>
        this._costCenterService.findAll().pipe(
          map((costCenters: any) =>
            costCenterActions.LoadCostCentersSuccess({ costCenters: costCenters['content'] as CostCenter[]})
          ),
          catchError((error: any) =>
            of(
              costCenterActions.LoadCostCentersFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCostCenter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(costCenterActions.CreateCostCenter),
      mergeMap(({ costCenter }) =>
        this._costCenterService.create(costCenter).pipe(
          map((newCostCenter: CostCenter) =>
            costCenterActions.CreateCostCenterSuccess({ costCenter: newCostCenter })
          ),
          tap(() => {
            this._toastr.success('Centre de Coût crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              costCenterActions.CreateCostCenterFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCostCenterSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(costCenterActions.CreateCostCenterSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/cost-centers/details', action.costCenter.id]
        });
      })
    )
  );

  updateCostCenter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(costCenterActions.UpdateCostCenter),
      exhaustMap(action =>
        this._costCenterService.update(action.costCenter).pipe(
          map((costCenter: CostCenter) =>
            costCenterActions.UpdateCostCenterSuccess({
              costCenter: { id: costCenter.id, changes: costCenter }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Centre de Coût mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              costCenterActions.UpdateCostCenterFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeCostCenter$ = createEffect(() =>
    this._actions$.pipe(
      ofType(costCenterActions.RemoveCostCenter),
      exhaustMap(action =>
        this._costCenterService.removes(action.ids).pipe(
          map((ids: string[]) =>
            costCenterActions.RemoveCostCenterSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Centre de Coût supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              costCenterActions.RemoveCostCenterFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeCostCenterSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(costCenterActions.RemoveCostCenterSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/cost-centers/new']
        });
      })
    )
  );


  removeCostCenters$ = createEffect(() =>
    this._actions$.pipe(
      ofType(costCenterActions.RemoveCostCenters),
      exhaustMap(action =>
        this._costCenterService.removes(action.ids).pipe(
          map((ids: string[]) =>
            costCenterActions.RemoveCostCentersSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Centres de Coût supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              costCenterActions.RemoveCostCentersFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
