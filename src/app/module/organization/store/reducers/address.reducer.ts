import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromActions from '@module/organization/store/actions';
import {Address} from '@module/organization/models';

export interface AddressState extends EntityState<Address> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
  imageHeader: any;
  imageFooter: any;
}

export const adapter: EntityAdapter<Address> = createEntityAdapter<Address>({
  selectId: model => model.id,
  sortComparer: (address1: Address, address2: Address): number =>
    address1.name.localeCompare(address2.name)
});

export const initialState: AddressState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null,
  imageHeader: null,
  imageFooter: null
});

export const addressReducer = createReducer(
  initialState,
on(fromActions.LoadAddresses, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
on(fromActions.LoadAddressesSuccess, (state, { addresses }) =>
    adapter.addMany(addresses, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
fromActions.CreateAddress,
fromActions.UpdateAddress,
    (state, { address }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(
    fromActions.SetAddressImage, (state, { id, image, field }) => {
      return {
        ...state,
        loading: true,
        loaded: false
      };

    }
  ),
on(fromActions.CreateAddressSuccess, (state, { address }) =>
    adapter.addOne(address, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
on(
  fromActions.UpdateAddressSuccess,
  fromActions.SetAddressImageSuccess,
  (state, { address }) =>
    adapter.updateOne(address, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromActions.DownloadAddressImageSuccess, (state, { image, field }) => ({
    ...state,
    imageHeader: field === 'header'? image: state.imageHeader,
    imageFooter: field === 'footer'? image: state.imageFooter,
    loading: false,
    loaded: true,
  })),
  on(
fromActions.RemoveAddressSuccess,
fromActions.RemoveAddressesSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
fromActions.LoadAddressesFail,
fromActions.CreateAddressFail,
fromActions.UpdateAddressFail,
fromActions.SetAddressImageFail,
fromActions.DownloadAddressImageFail,
fromActions.RemoveAddressFail,
fromActions.RemoveAddressesFail,
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
export const selectAddressImageHeader = (state: AddressState) => state.imageHeader;
export const selectAddressImageFooter = (state: AddressState) => state.imageFooter;
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
