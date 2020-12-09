import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromRole from '@module/organization/store/actions';
import {Role} from '@module/organization/models';

export interface RoleState extends EntityState<Role> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Role> = createEntityAdapter<Role>({
  selectId: model => model.id,
  sortComparer: (role1: Role, role2: Role): number =>
    role1.name.localeCompare(role2.name)
});

export const initialState: RoleState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const roleReducer = createReducer(
  initialState,
  on(fromRole.LoadRoles, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromRole.LoadRolesSuccess, (state, { roles }) =>
    adapter.addMany(roles, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(
    fromRole.CreateRole,
    fromRole.UpdateRole,
    (state, { role }) => {
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMsg: null
      };
    }
  ),
  on(fromRole.CreateRoleSuccess, (state, { role }) =>
    adapter.addOne(role, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromRole.UpdateRoleSuccess, (state, { role }) =>
    adapter.updateOne(role, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),

  on(
    fromRole.RemoveRoleSuccess,
    fromRole.RemoveRolesSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: true,
        errorMsg: null
      });
    }),

  on(
    fromRole.LoadRolesFail,
    fromRole.CreateRoleFail,
    fromRole.UpdateRoleFail,
    fromRole.RemoveRoleFail,
    fromRole.RemoveRolesFail,
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
export function reducer(state: RoleState | undefined, action: Action) {
  return roleReducer(state, action);
}
export const selectRoleLoading = (state: RoleState) => state.loading;
export const selectRoleLoaded = (state: RoleState) => state.loaded;
export const selectRoleErrorMsg = (state: RoleState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectRoleIds = selectIds;
export const selectRoleEntities = selectEntities;
export const selectAllRoles = selectAll;
export const selectRoleTotal = selectTotal;
