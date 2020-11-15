import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '@module/company/store';

@Injectable({
  providedIn: 'root'
})
export class CompanyImageGuard implements CanActivate {
  constructor(private _store: Store<fromStore.CompanyRootState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.companyId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: string): Observable<boolean> {
    return this._store.select(fromStore.selectCompanyLogo).pipe(
      tap(logo => {
        if (logo === null) { // always check image in backend when this route is fire
          this._store.dispatch(fromStore.DownloadCompanyLogo({ id }));
        }
      }),
      filter(logo => logo),
      take(1)
    );
  }
}
