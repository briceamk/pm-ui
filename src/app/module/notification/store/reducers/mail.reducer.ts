import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '@module/notification/store/actions';
import { Mail } from '@module/notification/models';

export interface MailState extends EntityState<Mail> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<Mail> = createEntityAdapter<Mail>({
  selectId: model => model.id,
  sortComparer: (mail1: Mail, mail2: Mail): number =>  {
    if(mail1.creationDate.getTime <= mail2.creationDate.getTime)
      return 1;
    else
      return -1;
  }

});

export const initialState: MailState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const mailReducer = createReducer(
  initialState,
  on(fromActions.LoadMails, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromActions.LoadMailsSuccess, (state, { mails }) =>
    adapter.addMany(mails, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromActions.CreateMailSuccess, (state, { mail }) =>
    adapter.addOne(mail, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(fromActions.UpdateMailSuccess, (state, { mail }) =>
    adapter.updateOne(mail, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),

  on(
    fromActions.RemoveMailSuccess,
    fromActions.RemoveMailsSuccess,
    (state, { ids }) => {
    return adapter.removeMany(ids, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    });
  }),

  on(
    fromActions.LoadMailsFail,
    fromActions.CreateMailFail,
    fromActions.UpdateMailFail,
    fromActions.RemoveMailFail,
    fromActions.RemoveMailsFail,
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
export function reducer(state: MailState | undefined, action: Action) {
  return mailReducer(state, action);
}
export const selectMailLoading = (state: MailState) => state.loading;
export const selectMailLoaded = (state: MailState) => state.loaded;
export const selectMailErrorMsg = (state: MailState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectMailIds = selectIds;
export const selectMailEntities = selectEntities;
export const selectAllMails = selectAll;
export const selectMailTotal = selectTotal;
