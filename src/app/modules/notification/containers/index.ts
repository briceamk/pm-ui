import {MailTreeComponent} from './mail-tree/mail-tree.component';
import {MailFormComponent} from './mail-form/mail-form.component';
import {MailTemplateFormComponent} from './mail-template-form/mail-template-form.component';
import {MailTemplateTreeComponent} from './mail-template-tree/mail-template-tree.component';
import {MailServerFormComponent} from './mail-server-form/mail-server-form.component';
import {MailServerTreeComponent} from './mail-server-tree/mail-server-tree.component';


export const components: any[] = [
  MailFormComponent,
  MailTreeComponent,
  MailTemplateFormComponent,
  MailTemplateTreeComponent,
  MailServerFormComponent,
  MailServerTreeComponent

];

export * from './mail-tree/mail-tree.component';
export * from './mail-form/mail-form.component';
export * from './mail-template-form/mail-template-form.component';
export * from './mail-template-tree/mail-template-tree.component';
export * from './mail-server-form/mail-server-form.component';
export * from './mail-server-tree/mail-server-tree.component';
