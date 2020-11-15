import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';
import * as fromStore from '@module/auth/store';
import {Store} from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private _store: Store<fromStore.SecurityState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean >  {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.selectRoleLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this._store.dispatch(fromStore.LoadRoles());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
