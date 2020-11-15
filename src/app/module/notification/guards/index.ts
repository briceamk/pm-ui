import {MailGuard} from '@module/notification/guards/mail.guard';
import {MailTemplateGuard} from '@module/notification/guards/mail-template.guard';
import {MailServerGuard} from '@module/notification/guards/mail-server.guard';


export const guards: any[] = [
  MailGuard,
  MailTemplateGuard,
  MailServerGuard
];

export * from  '@module/notification/guards/mail.guard';
export * from  '@module/notification/guards/mail-template.guard';
export * from  '@module/notification/guards/mail-server.guard';
