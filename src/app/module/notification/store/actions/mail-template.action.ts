import { createAction, props } from '@ngrx/store';
import { MailTemplate } from '@module/notification/models'
import { Update } from '@ngrx/entity';

export const LoadMailTemplates = createAction(
  '[MailTemplate List Page] Load MailTemplates '
);
export const LoadMailTemplatesSuccess = createAction(
  '[MailTemplate API] Load MailTemplates Success',
  props<{ mailTemplates: MailTemplate[] }>()
);
export const LoadMailTemplatesFail = createAction(
  '[MailTemplate API] Load MailTemplates Fail',
  props<{ errorMsg: any }>()
);

export const CreateMailTemplate = createAction(
  '[MailTemplate Form Page] Create MailTemplate ',
  props<{ mailTemplate: MailTemplate }>()
);
export const CreateMailTemplateSuccess = createAction(
  '[MailTemplate API] Create MailTemplate Success',
  props<{ mailTemplate: MailTemplate }>()
);
export const CreateMailTemplateFail = createAction(
  '[MailTemplate API] Create MailTemplate Fail',
  props<{ errorMsg: any }>()
);
export const UpdateMailTemplate = createAction(
  '[MailTemplate Form Page] Update MailTemplate ',
  props<{ mailTemplate: MailTemplate }>()
);
export const UpdateMailTemplateSuccess = createAction(
  '[MailTemplate API] Update MailTemplate Success',
  props<{ mailTemplate: Update<MailTemplate> }>()
);
export const UpdateMailTemplateFail = createAction(
  '[MailTemplate API] Update MailTemplate Fail',
  props<{ errorMsg: any }>()
);

export const RemoveMailTemplate = createAction(
  '[MailTemplate Form Page] Remove MailTemplate ',
  props<{ ids: string[] }>()
);
export const RemoveMailTemplateSuccess = createAction(
  '[MailTemplate API] Remove MailTemplate Success',
  props<{ ids: string[] }>()
);
export const RemoveMailTemplateFail = createAction(
  '[MailTemplate API] Remove MailTemplate Fail',
  props<{ errorMsg: any }>()
);


export const RemoveMailTemplates = createAction(
  '[MailTemplate List Page] Remove MailTemplates ',
  props<{ ids: string[] }>()
);
export const RemoveMailTemplatesSuccess = createAction(
  '[MailTemplate API] Remove MailTemplates Success',
  props<{ ids: string[] }>()
);
export const RemoveMailTemplatesFail = createAction(
  '[MailTemplate API] Remove MailTemplates Fails',
  props<{ errorMsg: any }>()
);
