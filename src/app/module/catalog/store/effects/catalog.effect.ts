import { Injectable } from '@angular/core';

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as catalogActions from '@module/catalog/store/actions/catalog.action';
import * as fromServices from '@module/catalog/services';
import { Catalog } from '@module/catalog/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CatalogEffect {
  constructor(
    private _actions$: Actions,
    private _catalogService: fromServices.CatalogService,
    private _toastr: ToastrService
  ) {}

  loadCatalogs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogActions.LoadCatalogs),
      exhaustMap(() =>
        this._catalogService.findAll().pipe(
          map((catalogs: any) =>
            catalogActions.LoadCatalogsSuccess({ catalogs: catalogs['content'] as Catalog[]})
          ),
          catchError((error: any) =>
            of(
              catalogActions.LoadCatalogsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCatalog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogActions.CreateCatalog),
      mergeMap(({ catalog }) =>
        this._catalogService.create(catalog).pipe(
          map((newCatalog: Catalog) =>
            catalogActions.CreateCatalogSuccess({ catalog: newCatalog })
          ),
          tap(() => {
            this._toastr.success('Catalogue crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              catalogActions.CreateCatalogFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCatalogSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogActions.CreateCatalogSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/catalog/catalogs/details', action.catalog.id]
        });
      })
    )
  );

  updateCatalog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogActions.UpdateCatalog),
      exhaustMap(action =>
        this._catalogService.update(action.catalog).pipe(
          map((catalog: Catalog) =>
            catalogActions.UpdateCatalogSuccess({
              catalog: { id: catalog.id, changes: catalog }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Catalogue mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              catalogActions.UpdateCatalogFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeCatalog$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogActions.RemoveCatalog),
      exhaustMap(action =>
        this._catalogService.removes(action.ids).pipe(
          map((ids: string[]) =>
            catalogActions.RemoveCatalogSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Catalogue supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              catalogActions.RemoveCatalogFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );


  removeCatalogSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogActions.RemoveCatalogSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/catalog/catalogs/new']
        });
      })
    )
  );


  removeCatalogs$ = createEffect(() =>
    this._actions$.pipe(
      ofType(catalogActions.RemoveCatalogs),
      exhaustMap(action =>
        this._catalogService.removes(action.ids).pipe(
          map((ids: string[]) =>
            catalogActions.RemoveCatalogsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Catalogues supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              catalogActions.RemoveCatalogsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
