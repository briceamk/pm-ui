import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromCategory from '@module/catalog/store/actions';
import {Category} from '@module/catalog/models';

export interface CategoryState extends EntityState<Category> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Category> = createEntityAdapter<Category>({
  selectId: model => model.id,
  sortComparer: (category1: Category, category2: Category): number =>
    category1.name.localeCompare(category2.name)
});

export const initialState: CategoryState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const categoryReducer = createReducer(
  initialState,
  on(fromCategory.LoadCategories, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromCategory.LoadCategoriesSuccess, (state, { categories }) =>
    adapter.addMany(categories, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromCategory.CreateCategory,
    fromCategory.UpdateCategory,
    (state, { category }) => {
    return {
      ...state,
      loading: true,
      loaded: false,
      errorMsg: null
    };
    }
  ),
  on(fromCategory.CreateCategorySuccess, (state, { category }) =>
    adapter.addOne(category, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromCategory.UpdateCategorySuccess, (state, { category }) =>
    adapter.updateOne(category, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromCategory.RemoveCategorySuccess,
    fromCategory.RemoveCategoriesSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    });
  }),

  on(
    fromCategory.LoadCategoriesFail,
    fromCategory.CreateCategoryFail,
    fromCategory.UpdateCategoryFail,
    fromCategory.RemoveCategoryFail,
    fromCategory.RemoveCategoriesFail,
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
export function reducer(state: CategoryState | undefined, action: Action) {
  return categoryReducer(state, action);
}
export const selectCategoryLoading = (state: CategoryState) => state.loading;
export const selectCategoryLoaded = (state: CategoryState) => state.loaded;
export const selectCategoryErrorMsg = (state: CategoryState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectCategoryIds = selectIds;
export const selectCategoryEntities = selectEntities;
export const selectAllCategories = selectAll;
export const selectCategoryTotal = selectTotal;
