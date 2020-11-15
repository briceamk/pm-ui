import { createAction, props } from '@ngrx/store';
import { Mail } from '@module/notification/models'
import { Update } from '@ngrx/entity';

export const LoadMails = createAction(
  '[Mail List Page] Load Mails '
);
export const LoadMailsSuccess = createAction(
  '[Mail API] Load Mails Success',
  props<{ mails: Mail[] }>()
);
export const LoadMailsFail = createAction(
  '[Mail API] Load Mails Fail',
  props<{ errorMsg: any }>()
);

export const CreateMail = createAction(
  '[Mail Form Page] Create Mail ',
  props<{ mail: Mail }>()
);
export const CreateMailSuccess = createAction(
  '[Mail API] Create Mail Success',
  props<{ mail: Mail }>()
);
export const CreateMailFail = createAction(
  '[Mail API] Create Mail Fail',
  props<{ errorMsg: any }>()
);
export const UpdateMail = createAction(
  '[Mail Form Page] Update Mail ',
  props<{ mail: Mail }>()
);
export const UpdateMailSuccess = createAction(
  '[Mail API] Update Mail Success',
  props<{ mail: Update<Mail> }>()
);
export const UpdateMailFail = createAction(
  '[Mail API] Update Mail Fail',
  props<{ errorMsg: any }>()
);

export const RemoveMail = createAction(
  '[Mail Form Page] Remove Mail ',
  props<{ ids: string[] }>()
);
export const RemoveMailSuccess = createAction(
  '[Mail API] Remove Mail Success',
  props<{ ids: string[] }>()
);
export const RemoveMailFail = createAction(
  '[Mail API] Remove Mail Fail',
  props<{ errorMsg: any }>()
);


export const RemoveMails = createAction(
  '[Mail List Page] Remove Mails ',
  props<{ ids: string[] }>()
);
export const RemoveMailsSuccess = createAction(
  '[Mail API] Remove Mails Success',
  props<{ ids: string[] }>()
);
export const RemoveMailsFail = createAction(
  '[Mail API] Remove Mails Fails',
  props<{ errorMsg: any }>()
);
