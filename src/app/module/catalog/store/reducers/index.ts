import {
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromCatalog from '@module/catalog/store/reducers/catalog.reducer';
import * as fromCategory from '@module/catalog/store/reducers/category.reducer';
import * as fromProduct from '@module/catalog/store/reducers/product.reducer';

export interface CatalogState {
  catalogs: fromCatalog.CatalogState;
  categories: fromCategory.CategoryState;
  products: fromProduct.ProductState
}

export interface State extends fromRoot.State {
  catalog: CatalogState;
}

export function reducers(state: CatalogState | undefined, action: Action) {
  return combineReducers({
   catalogs: fromCatalog.catalogReducer,
   categories: fromCategory.categoryReducer,
   products: fromProduct.productReducer
  })(state, action);
}

export const selectCatalogState = createFeatureSelector<CatalogState>(
  'catalog'
);
