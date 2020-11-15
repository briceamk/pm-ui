import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/cron/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JobInfoGuard implements CanActivate {
  constructor(private _store: Store<fromStore.CronState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.selectJobInfoLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this._store.dispatch(fromStore.LoadJobInfos());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }
}
