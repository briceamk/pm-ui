import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '@module/auth/store';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _store: Store<fromStore.SecurityState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.selectAuthLoggedIn).pipe(
      tap(loggedIn => {
        if (!loggedIn) {
          this._store.dispatch(fromStore.SignOut());
        }
      }),
      filter(loggedIn => loggedIn),
      take(1)
    );
  }
}
