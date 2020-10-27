
import { createSelector } from '@ngrx/store';

import * as fromRoot from '../../../../store';
import * as fromFeature from '../reducers';
import * as fromMailServer from '../reducers/mail-server.reducer';

import { MailServer } from '../../models';
import {Dictionary} from '@ngrx/entity';
import {Params} from '@angular/router';

const selectMailServerState = createSelector(
  fromFeature.selectNotificationState,
  (state: fromFeature.NotificationState) => state.mailServers
);

export const selectMailServerEntities = createSelector(
  selectMailServerState,
  fromMailServer.selectMailServerEntities
);

export const selectSelectedMailServer = createSelector(
  selectMailServerEntities,
  fromRoot.selectRouterParams,
  (entities: Dictionary<MailServer>, params: Params): MailServer => {
    return params && entities[params.companyId];
  }
);

export const selectMailServerIds = createSelector(
  selectMailServerState,
  fromMailServer.selectMailServerIds
);

export const selectAllMailServers = createSelector(
  selectMailServerState,
  fromMailServer.selectAllMailServers
);

export const selectMailServerLoaded = createSelector(
  selectMailServerState,
  fromMailServer.selectMailServerLoaded
);
export const selectMailServerLoading = createSelector(
  selectMailServerState,
  fromMailServer.selectMailServerLoading
);

export const selectMailServerErrorMsg = createSelector(
  selectMailServerState,
  fromMailServer.selectMailServerErrorMsg
);
export const selectMailServerTotal = createSelector(
  selectMailServerState,
  fromMailServer.selectMailServerTotal
);
