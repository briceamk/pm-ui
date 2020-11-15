import { createSelector } from '@ngrx/store';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/organization/store/reducers';
import * as fromAddress from '@module/organization/store/reducers/address.reducer';

import { Address } from '@module/organization/models';

const selectAddressState = createSelector(
  fromFeature.selectOrganizationState,
  (state: fromFeature.OrganizationState) => state.addresses
);

export const selectAddressEntities = createSelector(
  selectAddressState,
  fromAddress.selectAddressEntities
);

export const selectSelectedAddress = createSelector(
  selectAddressEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Address>, params: Params): Address => {
    return params && entities[params.addressId];
  }
);

export const selectAddressIds = createSelector(
  selectAddressState,
  fromAddress.selectAddressIds
);

export const selectAllAddresses = createSelector(
  selectAddressState,
  fromAddress.selectAllAddresses
);

export const selectAddressLoaded = createSelector(
  selectAddressState,
  fromAddress.selectAddressLoaded
);
export const selectAddressLoading = createSelector(
  selectAddressState,
  fromAddress.selectAddressLoading
);

export const selectAddressErrorMsg = createSelector(
  selectAddressState,
  fromAddress.selectAddressErrorMsg
);
export const selectAddressTotal = createSelector(
  selectAddressState,
  fromAddress.selectAddressTotal
);
