import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, exhaustMap, catchError, mergeMap, tap } from 'rxjs/operators';

import * as fromRoot from '@store/index';
import * as categoryActions from '@module/catalog/store/actions/category.action';
import * as fromServices from '@module/catalog/services';
import { Category } from '@module/catalog/models';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class CategoryEffect {
  constructor(
    private _actions$: Actions,
    private _categoryService: fromServices.CategoryService,
    private _toastr: ToastrService
  ) {}

  loadCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.LoadCategories),
      exhaustMap(() =>
        this._categoryService.findAll().pipe(
          map((categories: any) =>
            categoryActions.LoadCategoriesSuccess({ categories: categories['content'] as Category[]})
          ),
          catchError((error: any) =>
            of(
              categoryActions.LoadCategoriesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.CreateCategory),
      mergeMap(({ category }) =>
        this._categoryService.create(category).pipe(
          map((newCategory: Category) =>
            categoryActions.CreateCategorySuccess({ category: newCategory })
          ),
          tap(() => {
            this._toastr.success('Category créee correctement', 'PM App');
          }),
          catchError((error: any) =>
            of(
              categoryActions.CreateCategoryFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  createCategorySuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.CreateCategorySuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/catalog/categories/details', action.category.id]
        });
      })
    )
  );

  updateCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.UpdateCategory),
      exhaustMap(action =>
        this._categoryService.update(action.category).pipe(
          map((category: Category) =>
            categoryActions.UpdateCategorySuccess({
              category: { id: category.id, changes: category }
            })
          ),
          tap(() => {
            return this._toastr.info(
              'Category mis à jour correctement',
              'PM App'
            );
          }),
          catchError((error: any) =>
            of(
              categoryActions.UpdateCategoryFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );



  removeCategory$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.RemoveCategory),
      exhaustMap(action =>
        this._categoryService.removes(action.ids).pipe(
          map((ids: string[]) =>
            categoryActions.RemoveCategorySuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Categorie supprimée correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              categoryActions.RemoveCategoryFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );

  removeCategorySuccess$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.RemoveCategorySuccess),
      map(action => {
        return fromRoot.GO({
          path: ['/catalog/categories/new']
        });
      })
    )
  );


  removeCategories$ = createEffect(() =>
    this._actions$.pipe(
      ofType(categoryActions.RemoveCategories),
      exhaustMap(action =>
        this._categoryService.removes(action.ids).pipe(
          map((ids: string[]) =>
            categoryActions.RemoveCategoriesSuccess({ ids })
          ),
          tap(() => {
            return this._toastr.error(
              'Categories supprimées correctement',
              'PM'
            );
          }),
          catchError((error: any) =>
            of(
              categoryActions.RemoveCategoriesFail({
                errorMsg: error.error
              })
            )
          )
        )
      )
    )
  );
}
