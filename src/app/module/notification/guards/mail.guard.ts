import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/notification/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class MailGuard implements CanActivate {
  constructor(private _store: Store<fromStore.NotificationState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.selectMailLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this._store.dispatch(fromStore.LoadMails());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
