import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/catalog/store/reducers';
import * as fromCategory from '@module/catalog/store/reducers/category.reducer';

import { Category } from '@module/catalog/models';


const selectCategoryState = createSelector(
  fromFeature.selectCatalogState,
  (state: fromFeature.CatalogState) => state.categories
);

export const selectCategoryEntities = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryEntities
);

export const selectSelectedCategory = createSelector(
  selectCategoryEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Category>, params: Params): Category => {
    return params && entities[params.categoryId];
  }
);

export const selectCategoryIds = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryIds
);

export const selectAllCategories = createSelector(
  selectCategoryState,
  fromCategory.selectAllCategories
);

export const selectCategoryLoaded = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryLoaded
);
export const selectCategoryLoading = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryLoading
);

export const selectCategoryErrorMsg = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryErrorMsg
);
export const selectCategoryTotal = createSelector(
  selectCategoryState,
  fromCategory.selectCategoryTotal
);
