import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromActions from '@module/catalog/store/actions';
import {Product} from '@module/catalog/models';


export interface ProductState extends EntityState<Product> {
  loading?: boolean;
  loaded?: boolean;
  image: any;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({
  selectId: model => model.id,
  sortComparer: (product1: Product, product2: Product): number =>
    product1.name.localeCompare(product2.name)
});

export const initialState: ProductState = adapter.getInitialState({
  loading: false,
  loaded: false,
  image: null,
  errorMsg: null
});

export const productReducer = createReducer(
  initialState,
  on(fromActions.LoadProducts, state => ({
    ...state,
    loading: true,
    loaded: false,
    image: null,
    errorMsg: null
  })),
  on(fromActions.LoadProductsSuccess, (state, { products }) =>
    adapter.addMany(products, {
      ...state,
      loading: false,
      loaded: true,
      image: null,
      errorMsg: null
    })
  ),
  on(
    fromActions.CreateProduct,
    (state, { product }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        image: null,
        errorMsg: null
      };
    }
  ),
  on(fromActions.CreateProductSuccess, (state, { product }) =>
    adapter.addOne(product, {
      ...state,
      loading: false,
      loaded: true,
      image: null,
      errorMsg: null
    })
  ),
  on(
    fromActions.UpdateProduct,
    (state, { product }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        image: null,
        errorMsg: null
      };
    }
  ),
  on(
    fromActions.SetProductImage, (state, { id, image }) => {
      return {
        ...state,
        loading: true,
        loaded: false
      };

    }
  ),
  on(
    fromActions.UpdateProductSuccess,
    fromActions.SetProductImageSuccess,
    (state, { product }) =>
    adapter.updateOne(product, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromActions.DownloadProductImage, (state, { id }) => {
      return {
        ...state,
        loading: true,
        image: null,
        loaded: false
      };

    }
  ),
  on(fromActions.DownloadProductImageSuccess, (state, { image }) => ({
    ...state,
    image,
    loading: false,
    loaded: true,
  })),
  on(
    fromActions.RemoveProductSuccess,
    fromActions.RemoveProductsSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    });
  }),

  on(
    fromActions.LoadProductsFail,
    fromActions.CreateProductFail,
    fromActions.UpdateProductFail,
    fromActions.RemoveProductFail,
    fromActions.RemoveProductsFail,
    fromActions.SetProductImageFail,
    fromActions.DownloadProductImageFail,
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
export function reducer(state: ProductState | undefined, action: Action) {
  return productReducer(state, action);
}
export const selectProductLoading = (state: ProductState) => state.loading;
export const selectProductLoaded = (state: ProductState) => state.loaded;
export const selectProductImage = (state: ProductState) => state.image;
export const selectProductErrorMsg = (state: ProductState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectProductIds = selectIds;
export const selectProductEntities = selectEntities;
export const selectAllProducts = selectAll;
export const selectProductTotal = selectTotal;
