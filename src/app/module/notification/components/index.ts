import {MailTreeComponent} from '@module/notification/components/mail-tree/mail-tree.component';
import {MailFormComponent} from '@module/notification/components/mail-form/mail-form.component';
import {MailTemplateFormComponent} from '@module/notification/components/mail-template-form/mail-template-form.component';
import {MailTemplateTreeComponent} from '@module/notification/components/mail-template-tree/mail-template-tree.component';
import {MailServerFormComponent} from '@module/notification/components/mail-server-form/mail-server-form.component';
import {MailServerTreeComponent} from '@module/notification/components/mail-server-tree/mail-server-tree.component';


export const components: any[] = [
  MailFormComponent,
  MailTreeComponent,
  MailTemplateFormComponent,
  MailTemplateTreeComponent,
  MailServerFormComponent,
  MailServerTreeComponent

];

export * from '@module/notification/components/mail-tree/mail-tree.component';
export * from '@module/notification/components/mail-form/mail-form.component';
export * from '@module/notification/components/mail-template-form/mail-template-form.component';
export * from '@module/notification/components/mail-template-tree/mail-template-tree.component';
export * from '@module/notification/components/mail-server-form/mail-server-form.component';
export * from '@module/notification/components/mail-server-tree/mail-server-tree.component';
