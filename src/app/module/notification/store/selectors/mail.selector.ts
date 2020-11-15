
import { createSelector } from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromFeature from '@module/notification/store/reducers';
import * as fromMail from '@module/notification/store/reducers/mail.reducer';

import { Mail } from '@module/notification/models';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

const selectMailState = createSelector(
  fromFeature.selectNotificationState,
  (state: fromFeature.NotificationState) => state.mails
);

export const selectMailEntities = createSelector(
  selectMailState,
  fromMail.selectMailEntities
);

export const selectSelectedMail = createSelector(
  selectMailEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<Mail>, params: Params): Mail => {
    return params && entities[params.mailId];
  }
);

export const selectMailIds = createSelector(
  selectMailState,
  fromMail.selectMailIds
);

export const selectAllMails = createSelector(
  selectMailState,
  fromMail.selectAllMails
);

export const selectMailLoaded = createSelector(
  selectMailState,
  fromMail.selectMailLoaded
);
export const selectMailLoading = createSelector(
  selectMailState,
  fromMail.selectMailLoading
);

export const selectMailErrorMsg = createSelector(
  selectMailState,
  fromMail.selectMailErrorMsg
);
export const selectMailTotal = createSelector(
  selectMailState,
  fromMail.selectMailTotal
);
