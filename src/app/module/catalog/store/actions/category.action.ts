import {createAction, props} from '@ngrx/store';
import {Update} from '@ngrx/entity';
import {Category} from '@module/catalog/models';


export const LoadCategories = createAction(
  '[Category List Page] Load Categories '
);
export const LoadCategoriesSuccess = createAction(
  '[Category API] Load Categories Success',
  props<{ categories: Category[] }>()
);
export const LoadCategoriesFail = createAction(
  '[Category API] Load Categories Fail',
  props<{ errorMsg: any }>()
);

export const CreateCategory = createAction(
  '[Category Form Page] Create Category ',
  props<{ category: Category }>()
);
export const CreateCategorySuccess = createAction(
  '[Category API] Create Category Success',
  props<{ category: Category }>()
);
export const CreateCategoryFail = createAction(
  '[Category API] Create Category Fail',
  props<{ errorMsg: any }>()
);
export const UpdateCategory = createAction(
  '[Category Form Page] Update Category ',
  props<{ category: Category }>()
);
export const UpdateCategorySuccess = createAction(
  '[Category API] Update Category Success',
  props<{ category: Update<Category> }>()
);
export const UpdateCategoryFail = createAction(
  '[Category API] Update Category Fail',
  props<{ errorMsg: any }>()
);

export const RemoveCategory = createAction(
  '[Category Form Page] Remove Category ',
  props<{ ids: string[] }>()
);
export const RemoveCategorySuccess = createAction(
  '[Category API] Remove Category Success',
  props<{ ids: string[] }>()
);
export const RemoveCategoryFail = createAction(
  '[Category API] Remove Category Fail',
  props<{ errorMsg: any }>()
);

export const RemoveCategories = createAction(
  '[Category List & Form Page] Remove Categories ',
  props<{ ids: string[] }>()
);
export const RemoveCategoriesSuccess = createAction(
  '[Category API] Remove Categories Success',
  props<{ ids: string[] }>()
);
export const RemoveCategoriesFail = createAction(
  '[Category API] Remove Categories Fails',
  props<{ errorMsg: any }>()
);
