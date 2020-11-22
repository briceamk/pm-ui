import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as productActions from '@module/catalog/store/actions/product.action';
import * as fromServices from '@module/catalog/services';
import { Product } from '@module/catalog/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ProductEffect {
  constructor(
    private _actions$: Actions,
    private _productService: fromServices.ProductService,
    private _toastr: ToastrService
  ) {}

  loadProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.LoadProducts),
      exhaustMap(() =>
        this._productService.findAll().pipe(
          map((products: any) =>
            productActions.LoadProductsSuccess({ products: products['content'] as Product[]})
          ),
          catchError((error: any) =>
            of(
              productActions.LoadProductsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.CreateProduct),
      mergeMap(({ product }) =>
        this._productService.create(product).pipe(
          map((newProduct: Product) =>
            productActions.CreateProductSuccess({ product: newProduct })
          ),
          tap(() => {
            this._toastr.success('Article crée correctement', 'PM');
          }),
          catchError((error: any) =>
            of(
              productActions.CreateProductFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createProductSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.CreateProductSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/catalog/products/details', action.product.id]
        });
      })
    )
  );

  updateProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.UpdateProduct),
      exhaustMap(action =>
        this._productService.update(action.product).pipe(
          map((product: Product) =>
            productActions.UpdateProductSuccess({
              product: { id: product.id, changes: product }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Article mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              productActions.UpdateProductFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  updateProductAndSetProductImageSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.UpdateProductSuccess, productActions.SetProductImageSuccess),
      map(action => {
        return productActions.DownloadProductImage({id: action.product.changes.id});
      })
    )
  );

  setProductImage$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.SetProductImage),
      exhaustMap(action =>
        this._productService.upload(action.id, action.image).pipe(
          map((product: Product) =>
            productActions.SetProductImageSuccess({
              product: { id: product.id, changes: product }
            })
          ),
          tap(() => {
            this._toastr.info(
              'Image mis à jour correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              productActions.SetProductImageFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  setProductLogoSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.SetProductImageSuccess),
      map(action => {
        return productActions.DownloadProductImage({id: action.product.id as string});
      })
    )
  );

  downloadProductLogo$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.DownloadProductImage),
      exhaustMap(action =>
        this._productService.download(action.id).pipe(
          map((image: any) =>
            productActions.DownloadProductImageSuccess({image})
          ),
          catchError((error: any) =>
            of(
              productActions.DownloadProductImageFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeProduct$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.RemoveProduct),
      exhaustMap(action =>
        this._productService.removes(action.ids).pipe(
          map((ids: string[]) =>
            productActions.RemoveProductSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Article supprimé correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              productActions.RemoveProductFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeProductSuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.CreateProductSuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/catalog/products/details', action.product.id]
        });
      })
    )
  );

  removeProducts$ = createEffect(() =>
    this._actions$.pipe(
      ofType(productActions.RemoveProducts),
      exhaustMap(action =>
        this._productService.removes(action.ids).pipe(
          map((ids: string[]) =>
            productActions.RemoveProductsSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Articles supprimés correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              productActions.RemoveProductsFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
