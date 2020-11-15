import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromAddress from '@module/organization/store/actions';
import {Address} from '@module/organization/models';

export interface AddressState extends EntityState<Address> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Address> = createEntityAdapter<Address>({
  selectId: model => model.id,
  sortComparer: (address1: Address, address2: Address): number =>
    address1.name.localeCompare(address2.name)
});

export const initialState: AddressState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const addressReducer = createReducer(
  initialState,
  on(fromAddress.LoadAddresses, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromAddress.LoadAddressesSuccess, (state, { addresses }) =>
    adapter.addMany(addresses, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromAddress.CreateAddress,
    fromAddress.UpdateAddress,
    (state, { address }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromAddress.CreateAddressSuccess, (state, { address }) =>
    adapter.addOne(address, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromAddress.UpdateAddressSuccess, (state, { address }) =>
    adapter.updateOne(address, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromAddress.RemoveAddressSuccess,
    fromAddress.RemoveAddressesSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromAddress.LoadAddressesFail,
    fromAddress.CreateAddressFail,
    fromAddress.UpdateAddressFail,
    fromAddress.RemoveAddressFail,
    fromAddress.RemoveAddressesFail,
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
export function reducer(state: AddressState | undefined, action: Action) {
  return addressReducer(state, action);
}
export const selectAddressLoading = (state: AddressState) => state.loading;
export const selectAddressLoaded = (state: AddressState) => state.loaded;
export const selectAddressErrorMsg = (state: AddressState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectAddressIds = selectIds;
export const selectAddressEntities = selectEntities;
export const selectAllAddresses = selectAll;
export const selectAddressTotal = selectTotal;
