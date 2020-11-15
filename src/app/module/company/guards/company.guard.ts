import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '@module/company/store';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {
  constructor(private _store: Store<fromStore.CompanyRootState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.selectCompanyLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this._store.dispatch(fromStore.LoadCompanies());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
