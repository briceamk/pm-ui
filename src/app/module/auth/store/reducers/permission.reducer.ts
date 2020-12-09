import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromPermission from '@module/auth/store/actions';
import {Permission} from '@module/auth/models';

export interface PermissionState extends EntityState<Permission> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Permission> = createEntityAdapter<Permission>({
  selectId: model => model.id,
  sortComparer: (permission1: Permission, permission2: Permission): number =>
    permission1.code.localeCompare(permission2.code)
});

export const initialState: PermissionState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const permissionReducer = createReducer(
  initialState,
  on(fromPermission.LoadPermissions, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromPermission.LoadPermissionsSuccess, (state, { permissions }) =>
    adapter.addMany(permissions, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromPermission.CreatePermissionSuccess, (state, { permission }) =>
    adapter.addOne(permission, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(fromPermission.UpdatePermissionSuccess, (state, { permission }) =>
    adapter.updateOne(permission, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),

  on(
    fromPermission.RemovePermissionSuccess,
    fromPermission.RemovePermissionsSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    });
  }),

  on(
    fromPermission.LoadPermissionsFail,
    fromPermission.CreatePermissionFail,
    fromPermission.UpdatePermissionFail,
    fromPermission.RemovePermissionFail,
    fromPermission.RemovePermissionsFail,
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
export function reducer(state: PermissionState | undefined, action: Action) {
  return permissionReducer(state, action);
}
export const selectPermissionLoading = (state: PermissionState) => state.loading;
export const selectPermissionLoaded = (state: PermissionState) => state.loaded;
export const selectPermissionErrorMsg = (state: PermissionState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectPermissionIds = selectIds;
export const selectPermissionEntities = selectEntities;
export const selectAllPermissions = selectAll;
export const selectPermissionTotal = selectTotal;
