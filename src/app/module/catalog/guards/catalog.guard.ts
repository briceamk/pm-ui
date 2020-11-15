import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import {Observable, of} from 'rxjs';
import {Store} from '@ngrx/store';
import * as fromStore from '@module/catalog/store';
import {catchError, filter, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CatalogGuard implements CanActivate {
  constructor(private _store: Store<fromStore.CatalogState>) {}

  canActivate(): Observable<boolean> {
    return this.checkStore().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(): Observable<boolean> {
    return this._store.select(fromStore.selectCatalogLoaded).pipe(
      tap(loaded => {
        if (!loaded) {
          this._store.dispatch(fromStore.LoadCatalogs());
        }
      }),
      filter(loaded => loaded),
      take(1)
    );
  }

}
