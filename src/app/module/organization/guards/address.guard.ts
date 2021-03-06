import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/organization/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressGuard implements CanActivate {
  constructor(private _store: Store<fromStore.OrganizationState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.selectAddressLoaded).pipe(
      tap((loaded : boolean) => {
        if (!loaded) {
          this._store.dispatch(fromStore.LoadAddresses());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
