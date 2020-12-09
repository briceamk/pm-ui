import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '@module/organization/store';
import {Image} from '@module/organization/models';

@Injectable({
  providedIn: 'root'
})
export class AddressImageGuard implements CanActivate {
  constructor(private _store: Store<fromStore.OrganizationState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.addressId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: string): Observable<boolean> {
    return this._store.select(fromStore.selectAddressImage).pipe(
      tap((image: any) => {
        if (image === null) { // always check image in backend when this route is fire
          this._store.dispatch(fromStore.DownloadAddressImage({ id}));
        }
      }),
      filter(image => image),
      take(1)
    );
  }
}
