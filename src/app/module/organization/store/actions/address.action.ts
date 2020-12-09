import { createAction, props } from '@ngrx/store';
import {Address, Image} from '@module/organization/models';
import { Update } from '@ngrx/entity';

export const LoadAddresses= createAction(
  '[Address List Page] Load Addresses'
);
export const LoadAddressesSuccess = createAction(
  '[Address API] Load AddressesSuccess',
  props<{ addresses: Address[] }>()
);
export const LoadAddressesFail = createAction(
  '[Address API] Load AddressesFail',
  props<{ errorMsg: any }>()
);

export const CreateAddress = createAction(
  '[Address Form Page] Create Address ',
  props<{ address: Address }>()
);
export const CreateAddressSuccess = createAction(
  '[Address API] Create Address Success',
  props<{ address: Address }>()
);
export const CreateAddressFail = createAction(
  '[Address API] Create Address Fail',
  props<{ errorMsg: any }>()
);
export const UpdateAddress = createAction(
  '[Address Form Page] Update Address ',
  props<{ address: Address }>()
);
export const UpdateAddressSuccess = createAction(
  '[Address API] Update Address Success',
  props<{ address: Update<Address> }>()
);
export const UpdateAddressFail = createAction(
  '[Address API] Update Address Fail',
  props<{ errorMsg: any }>()
);

export const RemoveAddress = createAction(
  '[Address Form Page] Remove Address ',
  props<{ ids: string[] }>()
);
export const RemoveAddressSuccess = createAction(
  '[Address API] Remove Address Success',
  props<{ ids: string[] }>()
);
export const RemoveAddressFail = createAction(
  '[Address API] Remove Address Fail',
  props<{ errorMsg: any }>()
);


export const RemoveAddresses= createAction(
  '[Address List Page] Remove Addresses',
  props<{ ids: string[] }>()
);
export const RemoveAddressesSuccess = createAction(
  '[Address API] Remove AddressesSuccess',
  props<{ ids: string[] }>()
);
export const RemoveAddressesFail = createAction(
  '[Address API] Remove AddressesFails',
  props<{ errorMsg: any }>()
);

export const DownloadAddressImage = createAction(
  '[Address Form] Download Address  Image',
  props<{ id: string}>()
);

export const DownloadAddressImageSuccess = createAction(
  '[Address API] Download Address Image Success',
  props<{ image: Image }>()
);

export const DownloadAddressImageFail = createAction(
  '[Address API] Download Address Image Fail',
  props<{ errorMsg: any }>()
);

export const SetAddressImage = createAction(
  '[Address Form] Set Address Image',
  props<{ id: string; image: File, field: string }>()
);

export const SetAddressImageSuccess = createAction(
  '[Address API] Set Address Image Success',
  props<{ address: Update<Address> }>()
);

export const SetAddressImageFail = createAction(
  '[Address API] Set Address Image Fail',
  props<{ errorMsg: any }>()
);

