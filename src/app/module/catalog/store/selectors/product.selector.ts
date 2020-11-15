import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/catalog/store/reducers';
import * as fromProduct from '@module/catalog/store/reducers/product.reducer';

import { Product } from '@module/catalog/models';

const selectProductState = createSelector(
  fromFeature.selectCatalogState,
  (state: fromFeature.CatalogState) => state.products
);

export const selectProductEntities = createSelector(
  selectProductState,
  fromProduct.selectProductEntities
);

export const selectSelectedProduct = createSelector(
  selectProductEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Product>, params: Params): Product => {
    return params && entities[params.productId];
  }
);

export const selectProductIds = createSelector(
  selectProductState,
  fromProduct.selectProductIds
);

export const selectAllProducts = createSelector(
  selectProductState,
  fromProduct.selectAllProducts
);

export const selectProductLoaded = createSelector(
  selectProductState,
  fromProduct.selectProductLoaded
);
export const selectProductLoading = createSelector(
  selectProductState,
  fromProduct.selectProductLoading
);
export const selectProductImage = createSelector(
  selectProductState,
  fromProduct.selectProductImage
);
export const selectProductErrorMsg = createSelector(
  selectProductState,
  fromProduct.selectProductErrorMsg
);
export const selectProductTotal = createSelector(
  selectProductState,
  fromProduct.selectProductTotal
);
