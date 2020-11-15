import {MailServerEffect} from '@module/notification/store/effects/mail-server.effect';
import {MailTemplateEffect} from '@module/notification/store/effects/mail-template.effect';
import {MailEffect} from '@module/notification/store/effects/mail.effect';

export const effects: any[] = [
  MailEffect,
  MailTemplateEffect,
  MailServerEffect
];

export * from '@module/notification/store/effects/mail-server.effect';
export * from '@module/notification/store/effects/mail-template.effect';
