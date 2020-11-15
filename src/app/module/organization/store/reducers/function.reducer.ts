import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromFunction from '@module/organization/store/actions';
import {Function} from '@module/organization/models';

export interface FunctionState extends EntityState<Function> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Function> = createEntityAdapter<Function>({
  selectId: model => model.id,
  sortComparer: (_function1: Function, _function2: Function): number =>
    _function1.name.localeCompare(_function2.name)
});

export const initialState: FunctionState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const functionReducer = createReducer(
  initialState,
  on(fromFunction.LoadFunctions, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromFunction.LoadFunctionsSuccess, (state, { _functions }) =>
    adapter.addMany(_functions, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromFunction.CreateFunction,
    fromFunction.UpdateFunction,
    (state, { _function }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromFunction.CreateFunctionSuccess, (state, { _function }) =>
    adapter.addOne(_function, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromFunction.UpdateFunctionSuccess, (state, { _function }) =>
    adapter.updateOne(_function, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromFunction.RemoveFunctionSuccess,
    fromFunction.RemoveFunctionsSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromFunction.LoadFunctionsFail,
    fromFunction.CreateFunctionFail,
    fromFunction.UpdateFunctionFail,
    fromFunction.RemoveFunctionFail,
    fromFunction.RemoveFunctionsFail,
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
export function reducer(state: FunctionState | undefined, action: Action) {
  return functionReducer(state, action);
}
export const selectFunctionLoading = (state: FunctionState) => state.loading;
export const selectFunctionLoaded = (state: FunctionState) => state.loaded;
export const selectFunctionErrorMsg = (state: FunctionState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectFunctionIds = selectIds;
export const selectFunctionEntities = selectEntities;
export const selectAllFunctions = selectAll;
export const selectFunctionTotal = selectTotal;
