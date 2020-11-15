import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/catalog/store/reducers';
import * as fromCatalog from '@module/catalog/store/reducers/catalog.reducer';

import { Catalog } from '@module/catalog/models';

const selectCatalogState = createSelector(
  fromFeature.selectCatalogState,
  (state: fromFeature.CatalogState) => state.catalogs
);

export const selectCatalogEntities = createSelector(
  selectCatalogState,
  fromCatalog.selectCatalogEntities
);

export const selectSelectedCatalog = createSelector(
  selectCatalogEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Catalog>, params: Params): Catalog => {
    return params && entities[params.catalogId];
  }
);

export const selectCatalogIds = createSelector(
  selectCatalogState,
  fromCatalog.selectCatalogIds
);

export const selectAllCatalogs = createSelector(
  selectCatalogState,
  fromCatalog.selectAllCatalogs
);

export const selectCatalogLoaded = createSelector(
  selectCatalogState,
  fromCatalog.selectCatalogLoaded
);
export const selectCatalogLoading = createSelector(
  selectCatalogState,
  fromCatalog.selectCatalogLoading
);

export const selectCatalogErrorMsg = createSelector(
  selectCatalogState,
  fromCatalog.selectCatalogErrorMsg
);
export const selectCatalogTotal = createSelector(
  selectCatalogState,
  fromCatalog.selectCatalogTotal
);
