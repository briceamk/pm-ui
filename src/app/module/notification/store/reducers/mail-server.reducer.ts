import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '@module/notification/store/actions';
import { MailServer } from '@module/notification/models';

export interface MailServerState extends EntityState<MailServer> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<MailServer> = createEntityAdapter<MailServer>({
  selectId: model => model.id,
  sortComparer: (mailServer1: MailServer, mailServer2: MailServer): number =>
    mailServer1.hostname.localeCompare(mailServer2.hostname)
});

export const initialState: MailServerState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const mailServerReducer = createReducer(
  initialState,
  on(fromActions.LoadMailServers, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromActions.LoadMailServersSuccess, (state, { mailServers }) =>
    adapter.addMany(mailServers, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromActions.CreateMailServerSuccess, (state, { mailServer }) =>
    adapter.addOne(mailServer, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(fromActions.UpdateMailServerSuccess, (state, { mailServer }) =>
    adapter.updateOne(mailServer, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(
    fromActions.RemoveMailServerSuccess,
    fromActions.RemoveMailServersSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    });
  }),

  on(
    fromActions.LoadMailServersFail,
    fromActions.CreateMailServerFail,
    fromActions.UpdateMailServerFail,
    fromActions.RemoveMailServerFail,
    fromActions.RemoveMailServersFail,
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
export function reducer(state: MailServerState | undefined, action: Action) {
  return mailServerReducer(state, action);
}
export const selectMailServerLoading = (state: MailServerState) => state.loading;
export const selectMailServerLoaded = (state: MailServerState) => state.loaded;
export const selectMailServerErrorMsg = (state: MailServerState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectMailServerIds = selectIds;
export const selectMailServerEntities = selectEntities;
export const selectAllMailServers = selectAll;
export const selectMailServerTotal = selectTotal;
