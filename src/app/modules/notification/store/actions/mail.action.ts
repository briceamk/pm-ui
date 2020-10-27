import { createAction, props } from '@ngrx/store';
import { MailServer } from '../../models'
import { Update } from '@ngrx/entity';

export const LoadMailServers = createAction(
  '[MailServer List Page] Load MailServers '
);
export const LoadMailServersSuccess = createAction(
  '[MailServer API] Load MailServers Success',
  props<{ mailServers: MailServer[] }>()
);
export const LoadMailServersFail = createAction(
  '[MailServer API] Load MailServers Fail',
  props<{ errorMsg: any }>()
);

export const CreateMailServer = createAction(
  '[MailServer Form Page] Create MailServer ',
  props<{ mailServer: MailServer }>()
);
export const CreateMailServerSuccess = createAction(
  '[MailServer API] Create MailServer Success',
  props<{ mailServer: MailServer }>()
);
export const CreateMailServerFail = createAction(
  '[MailServer API] Create MailServer Fail',
  props<{ errorMsg: any }>()
);
export const UpdateMailServer = createAction(
  '[MailServer Form Page] Update MailServer ',
  props<{ mailServer: MailServer }>()
);
export const UpdateMailServerSuccess = createAction(
  '[MailServer API] Update MailServer Success',
  props<{ mailServer: Update<MailServer> }>()
);
export const UpdateMailServerFail = createAction(
  '[MailServer API] Update MailServer Fail',
  props<{ errorMsg: any }>()
);

export const RemoveMailServers = createAction(
  '[MailServer List & Form Page] Remove MailServers ',
  props<{ ids: string[] }>()
);
export const RemoveMailServersSuccess = createAction(
  '[MailServer API] Remove MailServers Success',
  props<{ ids: string[] }>()
);
export const RemoveMailServersFail = createAction(
  '[MailServer API] Remove MailServers Fail',
  props<{ errorMsg: any }>()
);
