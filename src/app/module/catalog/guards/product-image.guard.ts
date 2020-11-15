import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';

import * as fromStore from '@module/catalog/store';

@Injectable({
  providedIn: 'root'
})
export class ProductImageGuard implements CanActivate {
  constructor(private _store: Store<fromStore.CatalogState>) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    return this.checkStore(route.params.productId).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  checkStore(id: string): Observable<boolean> {
    return this._store.select(fromStore.selectProductImage).pipe(
      tap(image => {
        if (image === null) { // always check image in backend when this route is fire
          this._store.dispatch(fromStore.DownloadProductImage({ id }));
        }
      }),
      filter(image => image),
      take(1)
    );
  }
}
