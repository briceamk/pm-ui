
import { createSelector } from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/notification/store/reducers';
import * as fromMailTemplate from '@module/notification/store/reducers/mail-template.reducer';

import { MailTemplate } from '@module/notification/models';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

const selectMailTemplateState = createSelector(
  fromFeature.selectNotificationState,
  (state: fromFeature.NotificationState) => state.mailTemplates
);

export const selectMailTemplateEntities = createSelector(
  selectMailTemplateState,
  fromMailTemplate.selectMailTemplateEntities
);

export const selectSelectedMailTemplate = createSelector(
  selectMailTemplateEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<MailTemplate>, params: Params): MailTemplate => {
    return params && entities[params.mailTemplateId];
  }
);

export const selectMailTemplateIds = createSelector(
  selectMailTemplateState,
  fromMailTemplate.selectMailTemplateIds
);

export const selectAllMailTemplates = createSelector(
  selectMailTemplateState,
  fromMailTemplate.selectAllMailTemplates
);

export const selectMailTemplateLoaded = createSelector(
  selectMailTemplateState,
  fromMailTemplate.selectMailTemplateLoaded
);
export const selectMailTemplateLoading = createSelector(
  selectMailTemplateState,
  fromMailTemplate.selectMailTemplateLoading
);

export const selectMailTemplateErrorMsg = createSelector(
  selectMailTemplateState,
  fromMailTemplate.selectMailTemplateErrorMsg
);
export const selectMailTemplateTotal = createSelector(
  selectMailTemplateState,
  fromMailTemplate.selectMailTemplateTotal
);
