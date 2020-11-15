import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as addressActions from '@module/organization/store/actions/address.action';
import * as fromServices from '@module/organization/services';
import { Address } from '@module/organization/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AddressEffect {
  constructor(
    private _actions$: Actions,
    private _addressService: fromServices.AddressService,
    private _toastr: ToastrService
  ) {}

  loadAddresses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addressActions.LoadAddresses),
      exhaustMap(() =>
        this._addressService.findAll().pipe(
          map((addresses: any) =>
            addressActions.LoadAddressesSuccess({ addresses: addresses['content'] as Address[]})
          ),
          catchError((error: any) =>
            of(
              addressActions.LoadAddressesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createAddress$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addressActions.CreateAddress),
      mergeMap(({ address }) =>
        this._addressService.create(address).pipe(
          map((newAddress: Address) =>
            addressActions.CreateAddressSuccess({ address: newAddress })
          ),
          tap(() => {
            this._toastr.success('Addresse crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              addressActions.CreateAddressFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createAddressSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addressActions.CreateAddressSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/addresses/details', action.address.id]
        });
      })
    )
  );

  updateAddress$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addressActions.UpdateAddress),
      exhaustMap(action =>
        this._addressService.update(action.address).pipe(
          map((address: Address) =>
            addressActions.UpdateAddressSuccess({
              address: { id: address.id, changes: address }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Addresse mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              addressActions.UpdateAddressFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeAddress$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addressActions.RemoveAddress),
      exhaustMap(action =>
        this._addressService.removes(action.ids).pipe(
          map((ids: string[]) =>
            addressActions.RemoveAddressSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Addresse supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              addressActions.RemoveAddressFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeAddressSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addressActions.RemoveAddressSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/organization/addresses/new']
        });
      })
    )
  );


  removeAddresses$ = createEffect(() =>
    this._actions$.pipe(
      ofType(addressActions.RemoveAddresses),
      exhaustMap(action =>
        this._addressService.removes(action.ids).pipe(
          map((ids: string[]) =>
            addressActions.RemoveAddressesSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Addresses supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              addressActions.RemoveAddressesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
