import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromCostCenter from '@module/organization/store/actions';
import {CostCenter} from '@module/organization/models';

export interface CostCenterState extends EntityState<CostCenter> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<CostCenter> = createEntityAdapter<CostCenter>({
  selectId: model => model.id,
  sortComparer: (costCenter1: CostCenter, costCenter2: CostCenter): number =>
    costCenter1.name.localeCompare(costCenter2.name)
});

export const initialState: CostCenterState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const costCenterReducer = createReducer(
  initialState,
  on(fromCostCenter.LoadCostCenters, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromCostCenter.LoadCostCentersSuccess, (state, { costCenters }) =>
    adapter.addMany(costCenters, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromCostCenter.CreateCostCenter,
    fromCostCenter.UpdateCostCenter,
    (state, { costCenter }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromCostCenter.CreateCostCenterSuccess, (state, { costCenter }) =>
    adapter.addOne(costCenter, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromCostCenter.UpdateCostCenterSuccess, (state, { costCenter }) =>
    adapter.updateOne(costCenter, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromCostCenter.RemoveCostCenterSuccess,
    fromCostCenter.RemoveCostCentersSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromCostCenter.LoadCostCentersFail,
    fromCostCenter.CreateCostCenterFail,
    fromCostCenter.UpdateCostCenterFail,
    fromCostCenter.RemoveCostCenterFail,
    fromCostCenter.RemoveCostCentersFail,
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
export function reducer(state: CostCenterState | undefined, action: Action) {
  return costCenterReducer(state, action);
}
export const selectCostCenterLoading = (state: CostCenterState) => state.loading;
export const selectCostCenterLoaded = (state: CostCenterState) => state.loaded;
export const selectCostCenterErrorMsg = (state: CostCenterState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectCostCenterIds = selectIds;
export const selectCostCenterEntities = selectEntities;
export const selectAllCostCenters = selectAll;
export const selectCostCenterTotal = selectTotal;
