import {MailService} from '@module/notification/services/mail.service';
import {MailTemplateService} from '@module/notification/services/mail-template.service';
import {MailServerService} from '@module/notification/services/mail-server.service';


export const services: any[] = [
  MailService,
  MailTemplateService,
  MailServerService
];

export * from  '@module/notification/services/mail.service';
export * from  '@module/notification/services/mail-template.service';
export * from  '@module/notification/services/mail-server.service';
