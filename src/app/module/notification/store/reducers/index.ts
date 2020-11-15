import {
  createFeatureSelector,
  combineReducers,
  Action
} from '@ngrx/store';

import * as fromRoot from '@store/index';
import * as fromMail from '@module/notification/store/reducers/mail.reducer';
import * as fromMailServer from '@module/notification/store/reducers/mail-server.reducer';
import * as fromMailTemplate from '@module/notification/store/reducers/mail-template.reducer';

export interface NotificationState {
  mails: fromMail.MailState;
  mailServers: fromMailServer.MailServerState;
  mailTemplates: fromMailTemplate.MailTemplateState;
}

export interface State extends fromRoot.State {
  notification: NotificationState;
}

export function reducers(state: NotificationState | undefined, action: Action) {
  return combineReducers({
    mails: fromMail.mailReducer,
    mailServers: fromMailServer.mailServerReducer,
    mailTemplates: fromMailTemplate.mailTemplateReducer,
  })(state, action);
}

export const selectNotificationState = createFeatureSelector<NotificationState>(
  'notification'
);
