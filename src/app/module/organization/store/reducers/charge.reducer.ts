import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromCharge from '@module/organization/store/actions';
import {Charge} from '@module/organization/models';

export interface ChargeState extends EntityState<Charge> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Charge> = createEntityAdapter<Charge>({
  selectId: model => model.id,
  sortComparer: (charge1: Charge, charge2: Charge): number =>
    charge1.name.localeCompare(charge2.name)
});

export const initialState: ChargeState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const chargeReducer = createReducer(
  initialState,
  on(fromCharge.LoadCharges, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromCharge.LoadChargesSuccess, (state, { charges }) =>
    adapter.addMany(charges, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromCharge.CreateCharge,
    fromCharge.UpdateCharge,
    (state, { charge }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromCharge.CreateChargeSuccess, (state, { charge }) =>
    adapter.addOne(charge, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromCharge.UpdateChargeSuccess, (state, { charge }) =>
    adapter.updateOne(charge, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromCharge.RemoveChargeSuccess,
    fromCharge.RemoveChargesSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromCharge.LoadChargesFail,
    fromCharge.CreateChargeFail,
    fromCharge.UpdateChargeFail,
    fromCharge.RemoveChargeFail,
    fromCharge.RemoveChargesFail,
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
export function reducer(state: ChargeState | undefined, action: Action) {
  return chargeReducer(state, action);
}
export const selectChargeLoading = (state: ChargeState) => state.loading;
export const selectChargeLoaded = (state: ChargeState) => state.loaded;
export const selectChargeErrorMsg = (state: ChargeState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectChargeIds = selectIds;
export const selectChargeEntities = selectEntities;
export const selectAllCharges = selectAll;
export const selectChargeTotal = selectTotal;
