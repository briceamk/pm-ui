import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on, Action } from '@ngrx/store';

import * as fromActions from '@module/notification/store/actions';
import { MailTemplate } from '@module/notification/models';

export interface MailTemplateState extends EntityState<MailTemplate> {
  loading?: boolean;
  loaded?: boolean;
  errorMsg?: any;
}

export const adapter: EntityAdapter<MailTemplate> = createEntityAdapter<MailTemplate>({
  selectId: model => model.id,
  sortComparer: (mailTemplate1: MailTemplate, mailTemplate2: MailTemplate): number =>
    mailTemplate1.name.localeCompare(mailTemplate2.name)
});

export const initialState: MailTemplateState = adapter.getInitialState({
  loading: false,
  loaded: false,
  errorMsg: null
});

export const mailTemplateReducer = createReducer(
  initialState,
  on(fromActions.LoadMailTemplates, state => ({
    ...state,
    loading: true,
    loaded: false,
    errorMsg: null
  })),
  on(fromActions.LoadMailTemplatesSuccess, (state, { mailTemplates }) =>
    adapter.addMany(mailTemplates, {
      ...state,
      loading: false,
      loaded: true,
      errorMsg: null
    })
  ),
  on(fromActions.CreateMailTemplateSuccess, (state, { mailTemplate }) =>
    adapter.addOne(mailTemplate, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(fromActions.UpdateMailTemplateSuccess, (state, { mailTemplate }) =>
    adapter.updateOne(mailTemplate, {
      ...state,
      loading: false,
      loaded: false,
      errorMsg: null
    })
  ),
  on(
    fromActions.RemoveMailTemplateSuccess,
    fromActions.RemoveMailTemplatesSuccess,
    (state, { ids }) => {
      return adapter.removeMany(ids, {
        ...state,
        loading: false,
        loaded: false,
        errorMsg: null
      });
    }),

  on(
    fromActions.LoadMailTemplatesFail,
    fromActions.CreateMailTemplateFail,
    fromActions.UpdateMailTemplateFail,
    fromActions.RemoveMailTemplateFail,
    fromActions.RemoveMailTemplatesFail,
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
export function reducer(state: MailTemplateState | undefined, action: Action) {
  return mailTemplateReducer(state, action);
}
export const selectMailTemplateLoading = (state: MailTemplateState) => state.loading;
export const selectMailTemplateLoaded = (state: MailTemplateState) => state.loaded;
export const selectMailTemplateErrorMsg = (state: MailTemplateState) => state.errorMsg;

const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = adapter.getSelectors();

export const selectMailTemplateIds = selectIds;
export const selectMailTemplateEntities = selectEntities;
export const selectAllMailTemplates = selectAll;
export const selectMailTemplateTotal = selectTotal;
