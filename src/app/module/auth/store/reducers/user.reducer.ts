import {createEntityAdapter, EntityAdapter, EntityState} from '@ngrx/entity';
import {Action, createReducer, on} from '@ngrx/store';
import * as fromUser from '@module/auth/store/actions';
import {User} from '@module/auth/models';

export interface UserState extends EntityState<User> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>({
  selectId: model => model.id,
  sortComparer: (user1: User, user2: User): number =>
    user1.lastName.localeCompare(user2.lastName)
});

export const initialState: UserState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const userReducer = createReducer(
  initialState,
  on(fromUser.LoadUsers, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromUser.LoadUsersSuccess, (state, { users }) =>
    adapter.addMany(users, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromUser.CreateUserSuccess, (state, { user }) =>
    adapter.addOne(user, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(fromUser.UpdateUserSuccess, (state, { user }) =>
    adapter.updateOne(user, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),

  on(
    fromUser.RemoveUserSuccess,
    fromUser.RemoveUsersSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    });
  }),

  on(
    fromUser.LoadUsersFail,
    fromUser.CreateUserFail,
    fromUser.UpdateUserFail,
    fromUser.RemoveUserFail,
    fromUser.RemoveUsersFail,
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
export function reducer(state: UserState | undefined, action: Action) {
  return userReducer(state, action);
}
export const selectUserLoading = (state: UserState) => state.loading;
export const selectUserLoaded = (state: UserState) => state.loaded;
export const selectUserErrorMsg = (state: UserState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectUserIds = selectIds;
export const selectUserEntities = selectEntities;
export const selectAllUsers = selectAll;
export const selectUserTotal = selectTotal;
