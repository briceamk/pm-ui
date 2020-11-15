import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromCatalog from '@module/catalog/store/actions';
import {Catalog} from '@module/catalog/models';

export interface CatalogState extends EntityState<Catalog> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Catalog> = createEntityAdapter<Catalog>({
  selectId: model => model.id,
  sortComparer: (catalog1: Catalog, catalog2: Catalog): number =>
    catalog1.name.localeCompare(catalog2.name)
});

export const initialState: CatalogState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const catalogReducer = createReducer(
  initialState,
  on(fromCatalog.LoadCatalogs, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromCatalog.LoadCatalogsSuccess, (state, { catalogs }) =>
    adapter.addMany(catalogs, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromCatalog.CreateCatalog,
    fromCatalog.UpdateCatalog,
    (state, { catalog }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromCatalog.CreateCatalogSuccess, (state, { catalog }) =>
    adapter.addOne(catalog, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromCatalog.UpdateCatalogSuccess, (state, { catalog }) =>
    adapter.updateOne(catalog, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromCatalog.RemoveCatalogSuccess,
    fromCatalog.RemoveCatalogsSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    });
  }),

  on(
    fromCatalog.LoadCatalogsFail,
    fromCatalog.CreateCatalogFail,
    fromCatalog.UpdateCatalogFail,
    fromCatalog.RemoveCatalogFail,
    fromCatalog.RemoveCatalogsFail,
    (state, { errorMsg }) => {
      return {
        ...state,
        loading: false,
        loaded: false,
        errorMsg
      };
    }
  )
);
export function reducer(state: CatalogState | undefined, action: Action) {
  return catalogReducer(state, action);
}
export const selectCatalogLoading = (state: CatalogState) => state.loading;
export const selectCatalogLoaded = (state: CatalogState) => state.loaded;
export const selectCatalogErrorMsg = (state: CatalogState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectCatalogIds = selectIds;
export const selectCatalogEntities = selectEntities;
export const selectAllCatalogs = selectAll;
export const selectCatalogTotal = selectTotal;
