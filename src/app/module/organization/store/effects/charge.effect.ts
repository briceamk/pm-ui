import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as chargeActions from '@module/organization/store/actions/charge.action';
import * as fromServices from '@module/organization/services';
import { Charge } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ChargeEffect {
  constructor(
    private _actions$: Actions,
    private _chargeService: fromServices.ChargeService,
    private _toastr: ToastrService
  ) {}

  loadCharges$ = createEffect(() =>
    this._actions$.pipe(
      ofType(chargeActions.LoadCharges),
      exhaustMap(() =>
        this._chargeService.findAll().pipe(
          map((charges: any) =>
            chargeActions.LoadChargesSuccess({ charges: charges['content'] as Charge[]})
          ),
          catchError((error: any) =>
            of(
              chargeActions.LoadChargesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCharge$ = createEffect(() =>
    this._actions$.pipe(
      ofType(chargeActions.CreateCharge),
      mergeMap(({ charge }) =>
        this._chargeService.create(charge).pipe(
          map((newCharge: Charge) =>
            chargeActions.CreateChargeSuccess({ charge: newCharge })
          ),
          tap(() => {
            this._toastr.success('Charge crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              chargeActions.CreateChargeFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createChargeSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(chargeActions.CreateChargeSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/charges/details', action.charge.id]
        });
      })
    )
  );

  updateCharge$ = createEffect(() =>
    this._actions$.pipe(
      ofType(chargeActions.UpdateCharge),
      exhaustMap(action =>
        this._chargeService.update(action.charge).pipe(
          map((charge: Charge) =>
            chargeActions.UpdateChargeSuccess({
              charge: { id: charge.id, changes: charge }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Charge mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              chargeActions.UpdateChargeFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeCharge$ = createEffect(() =>
    this._actions$.pipe(
      ofType(chargeActions.RemoveCharge),
      exhaustMap(action =>
        this._chargeService.removes(action.ids).pipe(
          map((ids: string[]) =>
            chargeActions.RemoveChargeSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Charge supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              chargeActions.RemoveChargeFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeChargeSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(chargeActions.RemoveChargeSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/charges/new']
        });
      })
    )
  );


  removeCharges$ = createEffect(() =>
    this._actions$.pipe(
      ofType(chargeActions.RemoveCharges),
      exhaustMap(action =>
        this._chargeService.removes(action.ids).pipe(
          map((ids: string[]) =>
            chargeActions.RemoveChargesSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Charges supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              chargeActions.RemoveChargesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
